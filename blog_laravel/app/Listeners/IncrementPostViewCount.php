<?php

namespace App\Listeners;

use App\Events\postViewCount;
use App\Models\Post;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class IncrementPostViewCount
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(postViewCount $event): void
    {
        if (!session()->has('viewed_post_' . $event->id)) {
            $post = Post::find($event->id);
            if ($post) {
                $post->increment('viewed');
                session()->put('viewed_post_' . $event->id, true);
            }
        }
    }
}
