"use client";
import FXDatePicker from "@/src/components/form/FxDatePicker";
import FXInput from "@/src/components/form/FxInput";
import FXSelect from "@/src/components/form/FXSelect";
import dateToIso from "@/src/utils/dateToISO";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { ChangeEvent, useState } from "react";
import { AddIcon, TrashIcon } from "@/src/assets/icons";
import FXTextarea from "@/src/components/form/FxTextArea";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import { useRouter } from "next/navigation";
import generateDescription from "@/src/services/ImageDescription";

const page = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: CategorySuccess,
  } = useGetCategories();
  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();
  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToIso(data.dateFound),
      user: user!._id,
    };
    formData.append("data", JSON.stringify(postData));
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
    handleCreatePost(formData);
  };
  const handleFieldAppend = () => {
    append({ name: "questions", value: "" });
  };
  const cityOptions = allDistict()
    .sort()
    .map((city: string) => {
      return {
        key: city,
        label: city,
      };
    });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionGeneration = async () => {
    setIsLoading(true);
    try {
      const response = await generateDescription(
        imagePreviews[0],
        "Write a description for social media describing the given image that start with 'Found this ...."
      );
      methods.setValue("description", response);
      setIsLoading(false);
    } catch (error:any) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput name="title" label="Title" />
              </div>
              <div className="min-w-fit flex-1">
                <FXDatePicker name="dateFound" label="Found Date" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput name="location" label="Location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect label="City" name="city" options={cityOptions} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  label="Category"
                  name="category"
                  options={categoryOption}
                  disabled={!CategorySuccess}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXTextarea label="Description" name="description" />
              </div>
            </div>
            <div className="flex justify-end gap-5">
              {methods.getValues("description") && (
                <Button onClick={() => methods.resetField("description")}>
                  Clear
                </Button>
              )}
              <Button
                isLoading={isLoading}
                isDisabled={imagePreviews.length > 0 ? false : true}
                onClick={() => handleDescriptionGeneration()}
              >
                {isLoading ? "Generating" : "Description generate with Ai"}
              </Button>
            </div>
            <div>
              {imagePreviews.length > 0 &&
                imagePreviews.map((imageDataUrl, index) => (
                  <div key={index} className="relative inline-block m-3">
                    <img
                      src={imageDataUrl}
                      alt="preview"
                      className="w-full h-28 object-cover rounded-md"
                    />
                    <button
                      onClick={() =>
                        setImagePreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>

            <Divider className="my-5" />
            <div className="flex justify-between items-center">
              <h1 className="text-xl">Owner Verification Questions</h1>
              <Button
                onClick={() => {
                  handleFieldAppend();
                }}
              >
                <AddIcon />
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-5 my-2">
                <FXInput name={`questions.${index}.value`} label="Questions" />
                <Button onClick={() => remove(index)}>
                  <TrashIcon />{" "}
                </Button>
              </div>
            ))}
            <Divider className="my-5" />
            <Button type="submit">Post</Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default page;
