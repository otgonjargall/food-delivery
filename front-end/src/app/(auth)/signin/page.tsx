"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email("ta zuv email oruulnu"),
  password: z.string().min(6, "urt pass hii").max(10, "bogino pass hii"),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("durmee dagasan bna", data);
    try {
      const response = await axios.post("http://localhost3001/user/signin", {
        email: data.email,
        password: data.password,
      });
      console.log("RESPONSE", response);
      if (response.status === 200) {
        router.push("/admin/menu");
      }
    } catch (error) {}
  };
  return (
    <div className="w-1/2 flex justify-center items-center h-screen flex-col">
      <div>
        <Button variant={"outline"}>
          <ChevronLeft />
        </Button>
        <h2 className="font-bold text-2xl">Login</h2>
        <p className=" text-muted-foreground">
          Log in to enjoy your favorite dishes.
        </p>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    {...field}
                    id="form-rhf-demo-description"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </div>
    </div>
  );
}
