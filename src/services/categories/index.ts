import axiosInstance from "@/src/lib/axiosInstance";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/item-categories");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
