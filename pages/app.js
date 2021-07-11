import { useRouter } from "next/router";
import React from "react";
import { Template1, NoSsr } from "../components";

const app = (props) => {
  const router = useRouter();

  const { template } = router.query;

  return (
    <NoSsr>
      <div className="w-full h-[100vh] flex">
        {template === "1" && <Template1 {...props} />}
      </div>
    </NoSsr>
  );
};

export default app;
