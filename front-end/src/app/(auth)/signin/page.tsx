
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";

import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

// Zod Schema (Email + Password)
const formSchema = z.object({
  email: z.string().email("Зөв и-мэйл хаяг оруулна уу"),
  password: z.string().min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байна"),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const context = useContext(UserContext)
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("DURMEE DAGASAN BNA on submit ajillaa", data)
    console.log("Context",context);
    context?.signIn(data.email, data.password);
   
  };

  return (
    <div className="flex h-screen w-full">
      {/* Зүүн тал - Форм */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          {/* Буцах товч */}
          <Button variant="outline" size="icon" className="rounded-md w-9 h-9">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Гарчиг болон Тайлбар */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Log in to enjoy your favorite dishes.
            </p>
          </div>

          {/* Форм */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="space-y-3">
              {/* Email Input */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Input */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Forgot password link */}
            <div className="pt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-800 underline font-medium hover:text-black"
              >
                Forgot password ?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-md mt-4"
            >
              Let's Go
            </Button>
          </form>

          {/* Sign up холбоос */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Баруун тал - Зураг */}
      <div className="hidden lg:block w-1/2 p-4">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/delivery-image.png "  // public/ хэсэгт байгаа зургаа заана
            alt="delivery"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}