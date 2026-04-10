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
    <section className="w-full px-5">
      <h2 className="mb-6 px-3 text-center text-2xl font-semibold">Sign In</h2>

      <div className="border-border mx-auto max-w-md rounded-2xl border p-8 px-5">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-10">
          {/* Form Fields */}
          <div className="flex w-full flex-col gap-6">
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
            <div className="flex w-full flex-col gap-2">
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
                <span className="text-foreground text-sm font-medium">
                  Forgot Password?
                </span>
              </div>
            </div>
          </div>
          {/* Error Message */}
          {formError && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm font-medium">
              {formError}
            </div>
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            size="lg"
            className="w-full py-5 text-base font-semibold"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </section>
  );
}
