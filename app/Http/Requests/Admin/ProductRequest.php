<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit' => 'required|string|max:50',
            'price_amount' => 'required_if:can_sell,true|numeric|min:0',
            'can_sell' => 'boolean',
            'can_build_with' => 'boolean',
            'can_be_built' => 'boolean',
            'stripe_product_id' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
        ];
    }
}
