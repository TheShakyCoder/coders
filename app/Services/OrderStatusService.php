<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Carbon;

class OrderStatusService
{
    public function syncFromCheckoutSession(Order $order, object $session, ?string $status = null): Order
    {
        $nextStatus = $status ?? ($this->read($session, 'payment_status') === 'paid'
            ? Order::STATUS_PAID
            : $order->status);

        if ($order->status === Order::STATUS_PAID && $nextStatus !== Order::STATUS_PAID) {
            return $order;
        }

        $shippingAddress = $this->read($session, 'shipping_details.address')
            ?? $this->read($session, 'collected_information.shipping_details.address');

        $customerDetails = $this->read($session, 'customer_details');

        $order->forceFill([
            'status' => $nextStatus,
            'stripe_checkout_session_id' => $this->stringValue($this->read($session, 'id')) ?? $order->stripe_checkout_session_id,
            'stripe_payment_intent_id' => $this->stringValue($this->read($session, 'payment_intent')) ?? $order->stripe_payment_intent_id,
            'stripe_customer_id' => $this->stringValue($this->read($session, 'customer')) ?? $order->stripe_customer_id,
            'customer_email' => $this->read($customerDetails, 'email')
                ?? $this->stringValue($this->read($session, 'customer_email'))
                ?? $order->customer_email,
            'customer_name' => $this->read($customerDetails, 'name') ?? $order->customer_name,
            'currency' => strtolower($this->stringValue($this->read($session, 'currency')) ?? $order->currency),
            'subtotal_amount' => $this->intValue($this->read($session, 'amount_subtotal')) ?? $order->subtotal_amount,
            'shipping_amount' => $this->intValue($this->read($session, 'total_details.amount_shipping')) ?? $order->shipping_amount,
            'total_amount' => $this->intValue($this->read($session, 'amount_total')) ?? $order->total_amount,
            'shipping_address' => is_array($shippingAddress) ? $shippingAddress : $order->shipping_address,
            'customer_details' => is_array($customerDetails) ? $customerDetails : $order->customer_details,
            'stripe_session_payload' => json_decode(json_encode($session, JSON_THROW_ON_ERROR), true, 512, JSON_THROW_ON_ERROR),
            'paid_at' => $nextStatus === Order::STATUS_PAID ? ($order->paid_at ?? Carbon::now()) : $order->paid_at,
            'expired_at' => $nextStatus === Order::STATUS_EXPIRED ? ($order->expired_at ?? Carbon::now()) : $order->expired_at,
            'failed_at' => $nextStatus === Order::STATUS_PAYMENT_FAILED ? ($order->failed_at ?? Carbon::now()) : $order->failed_at,
        ])->save();

        if ($order->user !== null && $order->stripe_customer_id !== null && blank($order->user->stripe_customer_id)) {
            $order->user->forceFill([
                'stripe_customer_id' => $order->stripe_customer_id,
            ])->save();
        }

        return $order->refresh()->load('items');
    }

    public function markCanceled(Order $order): Order
    {
        if ($order->status === Order::STATUS_PAID) {
            return $order;
        }

        $order->forceFill([
            'status' => Order::STATUS_CANCELED,
            'canceled_at' => $order->canceled_at ?? Carbon::now(),
        ])->save();

        return $order->refresh()->load('items');
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

        return null;
    }

    protected function intValue(mixed $value): ?int
    {
        return is_int($value) ? $value : null;
    }
}
