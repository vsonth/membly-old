'use client';

import { useParams, useRouter } from 'next/navigation'
import { useState, FormEvent, ReactElement, useEffect } from 'react'
import Link from "next/link";
import { signup, SignupResponse } from "../actions/signup";
import SubmitButton from "../../../components/SubmitButton";
import { findEmailByToken } from '@/app/(app)/invite/[token]/actions/findEmailByToken'

export default function SignupForm(): ReactElement {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams()
  const [email, setEmail] = useState(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsPending(true);
    setError(null);  // Reset error state

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsPending(false);
      return;
    }

    const result: SignupResponse = await signup({ email, password, invitationToken: params.token });
    setIsPending(false);

    console.log(result);

    if (result.success) {
      // Redirect manually after successful login
      router.push("/dashboard");
    } else {
      // Display the error message
      setError(result.error || "Login failed");
    }
  }

  useEffect(() => {
    if(params.token){
      findEmailByToken({ invitationToken: params.token }).then((e) => setEmail(e))
    }
  }, [params])

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">
        Sign Up
      </div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full textInput"
              required
              value={email}
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full textInput"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full textInput"
              required
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <SubmitButton loading={isPending} text="Sign Up" />
        </form>
      </div>
    </div>
  );
}
