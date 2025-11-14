import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
        afterSignUpUrl="/register/verify-email-address" // 👈 après inscription, redirection

        appearance={{
          elements: {
            formButtonPrimary: "bg-black hover:bg-gray-900 text-white"
          }
        }}
      />
    </div>
  );
}
