<?php

namespace App\Http\Controllers;

use App\Services\StripeCheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ClubSilverController extends Controller
{
    public function store(Request $request, StripeCheckoutService $stripe): JsonResponse
    {
        $user = $request->user();

        abort_unless($user !== null, 403);

        if ($user->hasActiveClubSilver()) {
            return response()->json([
                'message' => 'Club Silver is already active on your account.',
            ], 422);
        }

        try {
            $session = $stripe->createClubSilverCheckoutSession($user);
        } catch (Throwable $exception) {
            Log::error('Club Silver checkout session creation failed.', [
                'user_id' => $user->id,
                'message' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Club Silver checkout is unavailable right now.',
            ], 500);
        }

        return response()->json([
            'checkout_url' => $session->url,
        ]);
    }

    public function success(Request $request): Response
    {
        return Inertia::render('ClubSilverSuccess', [
            'member' => $request->user()?->only([
                'name',
                'club_silver_ends_at',
                'club_silver_status',
            ]),
        ]);
    }

    public function cancel(): Response
    {
        return Inertia::render('ClubSilverCancel');
    }
}
