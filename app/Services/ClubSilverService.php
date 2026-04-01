<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Carbon;

class ClubSilverService
{
    public function syncFromCheckoutSession(object $session): ?User
    {
        $user = $this->resolveUserFromCheckoutSession($session);

        if ($user === null) {
            return null;
        }

        $user->forceFill([
            'stripe_customer_id' => $this->stringValue($this->read($session, 'customer')) ?? $user->stripe_customer_id,
            'club_silver_subscription_id' => $this->stringValue($this->read($session, 'subscription')) ?? $user->club_silver_subscription_id,
            'club_silver_status' => 'active',
            'club_silver_ends_at' => $user->club_silver_ends_at && $user->club_silver_ends_at->isFuture()
                ? $user->club_silver_ends_at
                : Carbon::now()->addMonth(),
        ])->save();

        return $user->refresh();
    }

    public function syncFromSubscription(object $subscription): ?User
    {
        $user = $this->resolveUserFromSubscription($subscription);

        if ($user === null) {
            return null;
        }

        $status = $this->stringValue($this->read($subscription, 'status'));
        $currentPeriodEnd = $this->timestampValue($this->read($subscription, 'current_period_end'));

        $user->forceFill([
            'stripe_customer_id' => $this->stringValue($this->read($subscription, 'customer')) ?? $user->stripe_customer_id,
            'club_silver_subscription_id' => $this->stringValue($this->read($subscription, 'id')) ?? $user->club_silver_subscription_id,
            'club_silver_status' => $status,
            'club_silver_ends_at' => in_array($status, ['active', 'trialing'], true) && $currentPeriodEnd !== null
                ? Carbon::createFromTimestamp($currentPeriodEnd)
                : $user->club_silver_ends_at,
        ])->save();

        return $user->refresh();
    }

    public function cancelFromSubscription(object $subscription): ?User
    {
        $user = $this->resolveUserFromSubscription($subscription);

        if ($user === null) {
            return null;
        }

        $user->forceFill([
            'stripe_customer_id' => $this->stringValue($this->read($subscription, 'customer')) ?? $user->stripe_customer_id,
            'club_silver_subscription_id' => $this->stringValue($this->read($subscription, 'id')) ?? $user->club_silver_subscription_id,
            'club_silver_status' => 'canceled',
            'club_silver_ends_at' => Carbon::now(),
        ])->save();

        return $user->refresh();
    }

    protected function resolveUserFromCheckoutSession(object $session): ?User
    {
        $userId = $this->stringValue($this->read($session, 'metadata.user_id'))
            ?? $this->stringValue($this->read($session, 'client_reference_id'));

        if ($userId !== null) {
            return User::query()->find($userId);
        }

        $customerId = $this->stringValue($this->read($session, 'customer'));

        if ($customerId !== null) {
            return User::query()->where('stripe_customer_id', $customerId)->first();
        }

        return null;
    }

    protected function resolveUserFromSubscription(object $subscription): ?User
    {
        $userId = $this->stringValue($this->read($subscription, 'metadata.user_id'));

        if ($userId !== null) {
            return User::query()->find($userId);
        }

        $subscriptionId = $this->stringValue($this->read($subscription, 'id'));

        if ($subscriptionId !== null) {
            $user = User::query()->where('club_silver_subscription_id', $subscriptionId)->first();

            if ($user !== null) {
                return $user;
            }
        }

        $customerId = $this->stringValue($this->read($subscription, 'customer'));

        if ($customerId !== null) {
            return User::query()->where('stripe_customer_id', $customerId)->first();
        }

        return null;
    }

    protected function read(object|array|null $subject, string $path): mixed
    {
        if ($subject === null) {
            return null;
        }

        $current = $this->normalize($subject);

        foreach (explode('.', $path) as $segment) {
            if (! is_array($current) || ! array_key_exists($segment, $current)) {
                return null;
            }

            $current = $this->normalize($current[$segment]);
        }

        return $current;
    }

    protected function normalize(mixed $value): mixed
    {
        if (is_array($value) || is_scalar($value) || $value === null) {
            return $value;
        }

        if (is_object($value) && method_exists($value, 'toArray')) {
            return $value->toArray();
        }

        if (is_object($value) && method_exists($value, 'jsonSerialize')) {
            return $value->jsonSerialize();
        }

        if (is_object($value)) {
            return get_object_vars($value);
        }

        return $value;
    }

    protected function stringValue(mixed $value): ?string
    {
        if (is_string($value) && $value !== '') {
            return $value;
        }

        if (is_object($value) && property_exists($value, 'id') && is_string($value->id)) {
            return $value->id;
        }

        if (is_int($value)) {
            return (string) $value;
        }

        return null;
    }

    protected function timestampValue(mixed $value): ?int
    {
        return is_int($value) ? $value : null;
    }
}
