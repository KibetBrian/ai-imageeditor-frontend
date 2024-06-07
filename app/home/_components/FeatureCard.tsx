import React from "react";
import Image from "next/image";
import { Card } from "@nextui-org/card";

import {
  ObjectWithBackground,
  ObjectWithoutBackground,
} from "../../../assets/images";
import { FeatureData } from "../constants";

interface FeatureCardProps {
  feature: FeatureData;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <Card
      isHoverable
      className="w-[320px] h-[120px] cursor-pointer p-1 mr-2 mb-2"
      radius="sm"
    >
      <div className="flex">
        <div className="flex-1 flex">
          <Image
            alt="Image with background"
            src={ObjectWithBackground}
            width={50}
          />
          <Image
            alt="Image with background"
            src={ObjectWithoutBackground}
            width={50}
          />
        </div>
        <div className="flex-1 space-y-2">
          <h6 className="font-medium text-small">{feature.title}</h6>
          <p className=" font-light text-[12px]">{feature.description}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;
