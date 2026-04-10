import { SignInForm } from "@/components/auth/signin-form";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center h-full">
      <SignInForm />
    </main>
  );
}
