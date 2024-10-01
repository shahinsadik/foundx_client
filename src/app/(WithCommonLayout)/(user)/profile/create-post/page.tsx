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

const page = () => {
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess,
  } = useGetCategories();
  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

  console.log(categoriesData);

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToIso(data.dateFound),
    };
    console.log(postData);
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

  return (
    <div>
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
              />
            </div>
            <div className="min-w-fit flex-1">
              {/* <FXInput name="location" label="Location" /> */}
            </div>
          </div>

          <Divider className="my-5" />
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Owner Verification Questions</h1>
            <Button
              onClick={() => {
                handleFieldAppend();
              }}
            >
              Append
            </Button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-5 my-2">
              <FXInput name={`questions.${index}.value`} label="Questions" />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}
          <Divider className="my-5" />
          <Button type="submit">Post</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
