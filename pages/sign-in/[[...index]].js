import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className="home h-screen w-full flex items-center justify-center">
    <SignIn path="/sign-in" routing="path" />
  </div>
);

export default SignInPage;
