<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Contracts\PostInterface;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $postInterface;

    public function setUp() :void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_get_all_products()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $mockPosts = Post::factory(10)->create(['user_id' => $user->id]);

        $response = $this->get('/api/posts');
        $response->assertStatus(200);
        $response->assertJsonCount(10, 'data');
        Log::info($user->toArray());
    }

    public function test_create_post_validation_error(){

        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('api/posts',[]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['heading','slug','author','image']);
    }

    public function test_user_can_create_a_post()
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $image = UploadedFile::fake()->image('my_image.png');
        $posts = [
            'heading'=>'My first Post',
            'image'=> $image,
            'slug'=>'My first slug',
            'author'=>'Dharini'
        ];
        $response = $this->post('/api/posts', $posts);
        $response->assertStatus(200);
        $responseData = $response->json();

        $this->assertDatabaseHas('posts',
        [
            'heading' => 'My first Post',
            'imageUrl' => $responseData['data']['imageUrl'],
            'slug' => 'My first slug',
            'author' => 'Dharini',
            'user_id'=> Auth::user()->id
        ]);
        $post = Post::where('heading', 'My first Post')->first();
        $this->assertInstanceOf(Post::class, $post);
    }

    public function test_edit_post_data()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        Storage::fake('public');
        $image = UploadedFile::fake()->image('old_image.png');

        $post = Post::factory()->create([
            'heading'=>'My edit Post',
            'imageUrl'=> 'images/5T5HpwmEVh5jFtCIylKPWd5ojURyGk1LJ8vuX0am.jpg',
            'slug'=>'My edit slug',
            'author'=>'Dharini edit',
            'user_id'=>1
        ]);
        $response = $this->get("api/posts/{$post->id}/edit");
        $response->assertStatus(200);
    }

    public function test_user_can_update_post()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $post = Post::factory()->create([
            'heading'=>'My edit Post',
            'imageUrl'=> 'images/5T5HpwmEVh5jFtCIylKPWd5ojURyGk1LJ8vuX0am.jpg',
            'slug'=>'My edit slug',
            'author'=>'Dharini edit',
            'user_id'=>1
        ]);

        $updated_text = [
            'heading'=>'My updated Post'
        ];

        $response = $this->put("api/posts/{$post->id}", $updated_text);
        $response->assertJsonFragment([
            'heading'=>'My updated Post'
        ]);
        $response->assertStatus(200);
    }

    public function test_user_can_delete_post()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $post = Post::factory()->create([
            'heading'=>'My delete Post',
            'imageUrl'=> 'images/5T5HpwmEVh5jFtCIylKPWd5ojURyGk1LJ8vuX0am.jpg',
            'slug'=>'My delete slug',
            'author'=>'Dharini delete',
            'user_id'=>1
        ]);

        $response = $this->delete("api/posts/{$post->id}");
        $response->assertStatus(200);
    }
}
