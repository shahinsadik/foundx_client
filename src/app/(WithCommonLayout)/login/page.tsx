"use client";

import FXForm from "@/src/components/form/FxForm";
import FXInput from "@/src/components/form/FxInput";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import loginValidationSchema from "@/src/schemas/login.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUserLogin } from "@/src/hooks/auth.hook";

import Loading from "@/src/components/UI/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";


const LoginPage = () => {
  const {setIsLoading:userLoading}=  useUser()
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true)
  };
  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
    return;
  }
  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" type="password" />
            </div>
            <Button
              className="my-3 w-full text-black rounded-lg bg-default-800 font-semibold"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>

          <div className="text-center">
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
