"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { cookies } from "next/headers";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
