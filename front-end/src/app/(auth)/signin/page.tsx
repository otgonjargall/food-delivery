import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { resolve } from "path";
import { useFormState } from "react-dom";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("ta zuv email oruulnu"),
  password: z.string().min(6, "urt pass hii").max(10, "bogino pass hii"),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolve: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSummit(data: z.infer<typeof formSchema>) {}
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
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSummit)}>
            <FieldGroup>
                <Controller 
                name="email"
                control={form.control}
                render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                            Bug Title</FieldLabel>
                            <Input
                            {...field}
                            id="form-rhf-demo-title"
                            aria-invalid={fieldState.invalid}
                            placeholder="Login button not working on mobile"
                            autoComplete="off"/>
                            {fieldState.invalid&&(<FieldError errors={[fieldState.error]}
                            )}
                    </Field>
                )}
                />
                <Controller 
                name= "password"
                control={form.control}
                render={({field,fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-description">
                            Password
                        </FieldLabel>
                        <Input 
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"{...field} id="form-rhf-demo-description"/>
                        <FieldDescription>
                            Include steps to reproduce, expected behavior,and what actually happened.
                        </FieldDescription>
                        {fieldState.invalid&&(<FieldError errors={[fieldState.error]}
                        )}
                    </Field>
                )}
                />
            </FieldGroup>
        </form>
      </div>
    </div>
  );
};
