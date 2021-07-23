import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => (
  <header className="w-full flex items-center justify-between p-[1rem] pr-[2rem] bg-[#fff] border-b border-[#1CC8EE85] rounded-t-md">
    <div className="flex items-center">
      <Link href="/">
        <a className="flex items-center justify-center">
          <span className="text-3xl font-bold ml-2 text-gradient bg-app-graient-to-l">
            Slickr
          </span>
        </a>
      </Link>
    </div>
    <div className="flex items-center">
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
);

export default Header;
