<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'heading'=>fake()->sentence(),
            'imageUrl'=>fake()->imageUrl(640, 480, 'posts', true),
            'slug'=>fake()->slug(),
            'description'=>fake()->paragraph(),
            'author'=>fake()->name(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Post $post) {
            Comment::factory()->count(2)->create([
                'post_id' => $post->id,
                'user_id' => $post->user_id,
            ]);
        });
    }
}
