"use client";

import React from "react";

import FeatureCard from "./_components/FeatureCard";
import { applicationFeatures } from "./constants";

const Home = () => {
  return (
    <div className="pl-5">
      <div className="flex items-center justify-center">
        <div className="flex flex-wrap w-[80%]">
          {applicationFeatures.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
