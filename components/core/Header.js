import Link from "next/link";

// clerk items
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

// icons
import { FiArrowRight } from "react-icons/fi";
import { StylishBtn } from ".."; // components

const Header = () => (
  <header className="w-full flex items-center justify-between p-3 pr-[2rem] bg-[#fff] border-b border-[#1CC8EE85] rounded-t-md">
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
        <Link href="/sign-in">
          <a>
            <StylishBtn
              text="Sign In"
              icon1={<FiArrowRight className="text-xl ml-2" />}
              icon={<FiArrowRight className="text-xl ml-2 text-[#fff]" />}
            />
          </a>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
);

export default Header;
