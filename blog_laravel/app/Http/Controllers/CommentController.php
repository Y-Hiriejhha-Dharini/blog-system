<?php

namespace App\Http\Controllers;

use App\Contracts\CommentInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    private  $commentInterface;

    public function __construct(CommentInterface $commentInterface)
    {
        $this->commentInterface = $commentInterface;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(CommentRequest $request)
    {
        return $this->commentInterface->store($request->validated());
    }

    /**
     * Show the form for updating the specified resource.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        return $this->commentInterface->update($request->validated()['body'], $comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        return $this->commentInterface->delete($comment);
    }
}
