import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button"; // Button импортлов
import { toast } from "sonner";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const formSchema = z.object({
  password: z.string().max(8," aas baga oron hii").min(6,"aas ih orontoi bailga"),
  verifyPassword: z.string(),
}).superRefine(({ password, verifyPassword }, ctx) => {
  if (password !== verifyPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Нууц үг таарахгүй байна",
      path: ["verifyPassword"],
    });

    toast.error("Нууц үг таарахгүй байна");
  }
});

export const SignUpPassword = () => {
  const context = useContext(UserContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      verifyPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log("Form Submitted:", data);
    console.log("DUREME DAGALAA", data);

    context?.signUp(data.password);
  };

  return (
    <div>
      {/* Форм */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup className="space-y-3">
          {/* Password Input */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="verifyPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  className="h-11"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Submit товчлуур нэмэв */}
        <Button type="submit" className="w-full h-11">
          Confirm
        </Button>
      </form> {/* <-- </form> хаалтыг засаж нэмэв */}
    </div>
  );
};



