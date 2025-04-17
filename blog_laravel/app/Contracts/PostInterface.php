<?php

namespace App\Contracts;

use App\Models\Post;

interface PostInterface
{
    public function index($data);
    public function store(array $post);
    public function edit(Post $post);
    public function update(array $data, Post $post);
    public function delete(Post $post);
    public function viewed($id);
}

