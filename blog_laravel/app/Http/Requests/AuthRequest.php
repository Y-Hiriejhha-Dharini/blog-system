<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if($this->isRegisterRequest())
        {
            return [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email','unique:users,email'],
                'password' => ['required', 'min:6','confirmed']
            ];
        }

        return [
                'email' => ['required', 'email', 'exists:users,email'],
                'password' => ['required', 'string', 'min:6']
            ];
    }

    private function isRegisterRequest()
    {
        return $this->routeIs('register');
    }
}
