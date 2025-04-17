<?php

namespace App\Contracts;

use App\Models\Comment;

interface CommentInterface
{
    public function store(array $comment);
    public function update(array $data, Comment $comment);
    public function delete(Comment $comment);
}
