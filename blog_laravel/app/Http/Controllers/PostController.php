<?php

namespace App\Http\Controllers;

use App\Contracts\PostInterface;
use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PostController extends Controller
{
    private $postInterface;

    public function __construct(PostInterface $postInterface)
    {
        $this->postInterface = $postInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->postInterface->index($request->All());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePostRequest $request)
    {
        return $this->postInterface->store($request->validated());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return $this->postInterface->edit($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        return $this->postInterface->update($request->validated(), $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        return $this->postInterface->delete( $post);
    }

    public function downloadPdf(Request $request)
    {
        $data = $request->only(['heading', 'slug', 'description', 'author']);
        $pdf = Pdf::loadView('pdf.post', $data);
        return $pdf->download('blog_post.pdf');
    }

    public function viewed($id)
    {
        $this->postInterface->viewed($id);
    }
}
