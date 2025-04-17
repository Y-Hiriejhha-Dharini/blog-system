<?php

namespace App\Mail;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class NewPostNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    protected $post;
    protected $imagePath;
    protected $pdfPublicUrl;
    protected $pdfRealPath;

    public function __construct(Post $post, string $imagePath, $pdfRealPath, $pdfPublicUrl)
    {
        $this->post = $post;
        $this->imagePath = $imagePath;
        $this->pdfPublicUrl = $pdfPublicUrl;
        $this->pdfRealPath = $pdfRealPath;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Post Notification Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.NewPost',
            with: [
                    'post' => $this->post,
                    'image' => $this->imagePath,
                    'pdf' => $this->pdfPublicUrl
                ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromPath($this->pdfRealPath)
                        ->as("{$this->post->slug}.pdf")
        ];
    }
}
