<?php

namespace App\Repositories;

use App\Contracts\PostInterface;
use App\Events\postViewCount;
use App\Events\PostViewed;
use App\Http\Resources\PostResponse;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class PostRepository implements PostInterface{

    public function index($data)
    {
        try{
            $search = $data['search'];
            $postsQuery = Post::with(['comments','user:id,name'])
                    ->OrderBy('id','desc');
            if ($search) {
                $postsQuery->where('heading', 'like', '%' . $search . '%');
            }

            $posts = $postsQuery->paginate(9)->toArray();
            return PostResponse::response('success', 'Data fetched succesdfully', $posts, 200);
        }catch(Throwable $e)
        {
            Log::error('post index error '.$e->getMessage());
            return PostResponse::response('error', 'Data Not fetched', [$e->getMessage()], 500);
        }

    }

    public function store(array $post)
    {
        try{
            DB::beginTransaction();

            if(isset($post['image']) && $post['image']->isValid()){
                $imageUrl = $post['image']->store('images', 'public');
            }else{
                return PostResponse::response('error', 'Invalid image', [], 400);
            }
            unset($post['image']);
            $post['imageUrl'] = $imageUrl;
            $post['user_id'] = Auth::user()->id;

            $stored_post = Post::create(
                $post
            );
            event(new PostViewed($stored_post));
            DB::commit();
            return PostResponse::response('success', 'Post Created succesdfully', $stored_post->toArray(), 200);
        }catch(Throwable $e)
        {
            DB::rollBack();
            Log::error('Post Create error '.$e->getMessage());
            return PostResponse::response('error', 'Post Not Created', [$e->getMessage()], 500);
        }
    }

    public function edit($post)
    {
        try{
            $imageUrl = assert('public/images', $post->id);
            $data = $post->toArray();
            $data['imageUrl'] = $imageUrl;
            return PostResponse::response('success', 'Data fetched succesdfully', $data, 200);
        }catch(Throwable $e)
        {
            Log::error('post edit error '.$e->getMessage());
            return PostResponse::response('error', 'Data Not fetched', [$e->getMessage()], 500);
        }
    }

    public function update($data, $post)
    {
        try{
            DB::beginTransaction();
            $post->update($data);

            DB::commit();
            return PostResponse::response('success', 'Post updated succesdfully', $post->toArray(), 200);
        }catch(Throwable $e)
        {
            DB::rollBack();
            Log::error('Post Not updated '.$e->getMessage());
            return PostResponse::response('error', 'Data Not Updated', [$e->getMessage()], 500);
        }
    }

    public function delete($post)
    {
        try{
            DB::beginTransaction();
            $post->delete();
            DB::commit();
            return PostResponse::response('success', 'Post deleted succesdfully', $post->toArray(), 200);
        }catch(Throwable $e)
        {
            DB::rollBack();
            Log::error('Post Not deleted '.$e->getMessage());
            return PostResponse::response('error', 'Data Not deleted', [$e->getMessage()], 500);
        }
    }

    public function viewed($id)
    {
        event(new postViewCount($id));
    }
}
