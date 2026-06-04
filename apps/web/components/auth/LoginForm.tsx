"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { LoginSchema, type LoginSchemaType } from "@org/lib";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: standardSchemaResolver(LoginSchema),
  });

  function onSubmit(data: LoginSchemaType) {
    console.log(data);
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
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <FieldGroup>
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
                placeholder="Enter your password"
                aria-invalid={!!errors.password}
                className="h-12.5 pr-10"
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 mt-3">
          <Button
            type="submit"
            className="w-full h-12.5 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Create one
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
