"use client";

import React from "react";
import { format } from "date-fns";
import {
  Card as NextUiCard,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { IPost } from "@/src/types";
const Card = ({ post }: {post:IPost}) => {
  const {
    title,
    category,
    description,
    images,
    location,
    city,
    dateFound,
    status,
  } = post || {};

  return (
    <NextUiCard className="h-[300px] w-full">
      <CardHeader className="absolute top-1 z-10 flex-col items-start ">
        <p className="absolute -to-0 right-1 rounded-full bg-black px-2 text-tiny uppercase">
          {category?.name}
        </p>
        <h4 className=" mt-2 rounded bg-black/30 p-1 text-2xl font-medium text-white">
          {title}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        className="scale-120 z-0 h-full w-full -translate-y-6 object-cover"
        src={images[0]}
        alt="image"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 bg-slate-100">
        <div className="">
          <p className="text-tiny text-black">{city}</p>
          <p className=" text-tiny text-black">
            {format(new Date(dateFound), "dd MMMM, yyyy")}
          </p>
        </div>
        <Button
          className="text-tiny bg-black  text-white"
          radius="full"
          size="sm"
        >
          Details
        </Button>
      </CardFooter>
    </NextUiCard>
  );
};

export default Card;
