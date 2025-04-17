<?php

namespace App\Observers;

use App\Mail\NewPostNotificationMail;
use App\Models\Log;
use App\Models\Post;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        Log::create([
            'action' => 'created',
            'description' => $post->description,
            'user_id' => $post->user_id
        ]);

        $imagePath = asset("storage/{$post->imageUrl}");
        $data = $post->only(['heading', 'slug', 'description', 'author']);
        $pdfFile = Pdf::loadView('pdf.post', $data);
        $pdfPath = "{$post->id}.pdf";
        Storage::disk('public')->put($pdfPath, $pdfFile->output());
        $pdfRealPath = storage_path("app/public/{$pdfPath}");
        $pdfPublicUrl = asset("storage/{$pdfPath}");

        Mail::to('hirijhaa@gmail.com')->send(new NewPostNotificationMail($post, $imagePath, $pdfRealPath, $pdfPublicUrl));

        $pdfPath = "{$post->id}.pdf";

    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        //
    }
}
