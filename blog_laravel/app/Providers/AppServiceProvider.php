<?php

namespace App\Providers;

use App\Contracts\CommentInterface;
use App\Contracts\PostInterface;
use App\Events\postViewCount;
use App\Events\PostViewed;
use App\Listeners\IncrementPostViewCount;
use App\Listeners\LogViewerIp;
use App\Models\Post;
use App\Observers\PostObserver;
use App\Repositories\CommentRepository;
use App\Repositories\PostRepository;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(PostInterface::class, PostRepository::class);
        $this->app->bind(CommentInterface::class, CommentRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
        Post::observe(PostObserver::class);
        Event::listen(
            PostViewed::class,
                LogViewerIp::class
        );
        Event::listen(
            postViewCount::class,
                IncrementPostViewCount::class,
        );
    }
}
