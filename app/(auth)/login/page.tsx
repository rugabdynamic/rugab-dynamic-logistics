import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="card p-8 text-center text-sm text-gray-500">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
