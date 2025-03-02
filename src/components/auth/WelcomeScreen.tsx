
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export const WelcomeScreen = () => {
  return (
    <div className="text-center space-y-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to EchoSphere</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Manage multiple social media personas and cross-post content with AI-assisted improvements.
        Sign in to get started.
      </p>
      <div className="flex justify-center gap-4">
        <SignInButton mode="redirect">
          <Button variant="default" size="lg">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="redirect">
          <Button variant="outline" size="lg">
            Create Account
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
};
