
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button"; // Button импортлов
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const formSchema = z.object({
  email: z.string().email("Зөв и-мэйл хаяг оруулна уу"),
});

export const SignUpEmail = ({handleStep}: {handleStep: () => void}) => {
  const context = useContext(UserContext);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Submitted:", data);
    handleStep();
    context?.handleEmail(data.email);
  };

  return (
    <div>
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
        </FieldGroup>

        {/* Submit товчлуур нэмэв */}
        <Button type="submit" className="w-full h-11">
          Continue
        </Button>
      </form> {/* <-- </form> хаалтыг засаж нэмэв */}
    </div>
  );
};
