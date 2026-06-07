"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUp } from "@/lib/actions/user.actions";
import { RegisterSchema, type RegisterSchemaType } from "@org/lib";
import { useTransition } from "react";
import { toast } from "sonner";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: standardSchemaResolver(RegisterSchema),
  });
  const [isProcessing, setIsProcessing] = useTransition();

  const isSubmitting = isProcessing || isFormSubmitting;

  async function onSubmit(data: RegisterSchemaType) {
    setIsProcessing(async () => {
      const result = await signUp(data);
      if (result.status) {
        toast.success("Sucessfully Created account.");
        reset();
        return;
      }
      toast.error(result.errors?.message);
    });
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardHeader className="px-6 pt-6 pb-4 gap-3">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
            <ShoppingBag
              className="size-5 text-primary-foreground"
              strokeWidth={2.5}
            />
          </div>
          <span className="font-heading text-2xl font-bold text-primary tracking-tight">
            Maamo
          </span>
        </div>
        <div>
          <CardTitle className="text-xl font-semibold">
            Create an account
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <Input
                placeholder="Enter Your name"
                aria-invalid={!!errors.name}
                className="h-12.5"
                {...register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={!!errors.email}>
              <Input
                type="email"
                placeholder="Enter Your Email"
                aria-invalid={!!errors.email}
                className="h-12.5"
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={!!errors.password}>
              <PasswordInput
                className="h-12.5"
                placeholder="Enter Your Password"
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            <Field data-invalid={!!errors.gender}>
              <Select
                onValueChange={(value) =>
                  setValue("gender", value as "Female" | "Male", {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  id="gender"
                  aria-invalid={!!errors.gender}
                  className="w-full h-12.5!"
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[errors.gender]} />
            </Field>

            <Button
              type="submit"
              className="w-full h-12.5 text-base font-semibold mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm pb-6">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
