<?php

namespace App\Listeners;

use App\Events\PostViewed;
use App\Models\Post;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

class LogViewerIp
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
    public function handle(PostViewed $event): void
    {
        $ip = Request::ip();
        Log::info("Post Id {$event->post->id} viewed by IP: $ip");
    }
}
