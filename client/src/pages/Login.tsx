import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/register"
        appearance={{
          elements: {
            formButtonPrimary: "bg-black hover:bg-gray-900 text-white"
          }
        }}
      />
    </div>
  );
}
