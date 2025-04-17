<?php

namespace App\Http\Resources;

use Illuminate\Http\JsonResponse;

class PostResponse
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static function response(string $status, string $message, mixed $data=[], int $status_code):JsonResponse
    {
        return response()->json([
            'status'=> $status,
            'message'=> $message,
            'data'=> $data,
        ],$status_code);
    }
}
