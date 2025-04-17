<?php

namespace App\Repositories;

use App\Contracts\CommentInterface;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentRepository implements CommentInterface
{
    public function store($comment)
    {

        $comment = Comment::create(
            $comment
        );

        return response()->json(['comment' => $comment], 201);
    }

    // Update a comment
    public function update($data, $comment)
    {
        $comment->update([
            'body' => $data
        ]);

        return response()->json(['comment' => $comment], 200);
    }

    public function delete($comment)
    {
        if ($comment->user_id !== Auth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
