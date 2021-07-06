import { useRouter } from "next/router";
import React from "react";

const app = () => {
  const router = useRouter();

  const { template } = router.query;

  return <div className="w-full h-[100vh] flex">{template}</div>;
};

export default app;
