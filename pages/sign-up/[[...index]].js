import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
  <div className="home h-screen w-full flex items-center justify-center">
    <SignUp path="/sign-up" routing="path" />
  </div>
);

export default SignUpPage;
