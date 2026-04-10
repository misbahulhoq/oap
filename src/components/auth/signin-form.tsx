"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignInFormProps {
  onSubmit?: (data: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function SignInForm({
  onSubmit,
  isLoading = false,
  error,
}: SignInFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(
    error || null,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Please enter your email or user ID");
      return;
    }

    if (!password) {
      setFormError("Please enter your password");
      return;
    }

    if (onSubmit) {
      try {
        await onSubmit({ email, password });
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "An error occurred");
      }
    }
  };

  return (
    <section className="w-full">
      <h2 className="text-center mb-6 px-3 text-2xl font-semibold">Sign In</h2>

      <div className=" max-w-md mx-auto rounded-2xl border border-border p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
          {/* Form Fields */}
          <div className="flex flex-col gap-6 w-full">
            {/* Email/User ID Field */}
            <Input
              type="text"
              label="Email/ User ID"
              placeholder="Enter your email/User ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  showPassword ? (
                    <EyeOff size={24} strokeWidth={1.5} />
                  ) : (
                    <Eye size={24} strokeWidth={1.5} />
                  )
                }
                onIconClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                required
              />
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-foreground hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
          {/* Error Message */}
          {formError && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
              {formError}
            </div>
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            size="lg"
            className="w-full text-base font-semibold py-5"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </section>
  );
}
