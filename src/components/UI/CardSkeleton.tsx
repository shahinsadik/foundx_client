"use client";

import React from "react";

import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  Skeleton,
  Image
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

const CardSkeleton = () => {
  return (
    <NextUiCard className="h-[300px] w-full">
      <CardHeader className="absolute top-1 z-10 flex-col items-start ">
        <Skeleton>
          <div className="absolute -to-0 right-1 rounded-full bg-black px-2 w-16 h-1"></div>
        </Skeleton>
        <Skeleton>
          <div className="absolute -to-0 right-1 rounded-full bg-black px-2 w-16 h-1"></div>
        </Skeleton>
        <Skeleton>
          <h4 className=" mt-2 rounded bg-black/30 p-1 text-2xl font-medium text-white"></h4>
        </Skeleton>
      </CardHeader>
      <Skeleton><Image
        removeWrapper
        className="scale-120 z-0 h-full w-full -translate-y-6 object-cover"
        src=""
        alt="image"
      /></Skeleton>
      <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 ">
          <div className="">
        
        <Skeleton>
            <div className="w-10 h-1 rounded-md"></div>
            <div className="w-20 h-1  rounded-md"></div>
        </Skeleton>
           
          </div>
        <Skeleton className="rounded-3xl">
          {" "}
          <Button
            className="text-tiny bg-black  text-white"
            radius="full"
            size="sm"
          ></Button>
        </Skeleton>
      </CardFooter>
    </NextUiCard>
  );
};

export default CardSkeleton;
