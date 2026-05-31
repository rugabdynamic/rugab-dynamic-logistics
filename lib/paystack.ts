// Paystack integration. Server-side only (uses the secret key). When
// PAYSTACK_SECRET_KEY is unset, returns a clear "not configured" result so the
// rest of the app keeps working in dev without payment credentials.

interface InitResult {
  ok: boolean;
  configured: boolean;
  authorizationUrl?: string;
  reference?: string;
  message: string;
}

export function isPaystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export async function initializeTransaction(opts: {
  email: string;
  amountNaira: number;
  reference: string;
}): Promise<InitResult> {
  if (!isPaystackConfigured()) {
    return {
      ok: false,
      configured: false,
      message: "Paystack is not configured. Set PAYSTACK_SECRET_KEY to enable online payments.",
    };
  }

  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      // Paystack expects the amount in kobo (smallest currency unit).
      body: JSON.stringify({
        email: opts.email,
        amount: Math.round(opts.amountNaira * 100),
        reference: opts.reference,
        currency: "NGN",
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.status) {
      return { ok: false, configured: true, message: data.message ?? "Paystack initialization failed." };
    }
    return {
      ok: true,
      configured: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      message: "Payment initialized.",
    };
  } catch (err) {
    console.error("Paystack init error:", err);
    return { ok: false, configured: true, message: "Could not reach Paystack. Try again later." };
  }
}
