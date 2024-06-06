"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/editor");
  };

  return (
    <div className="pl-5">
      <Button onClick={handleNavigate}>Editor</Button>
    </div>
  );
};

export default Home;
