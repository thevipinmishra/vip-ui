import type { ComponentPropsWithRef, ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Block({
  title,
  description,
  action,
  as = "h4",
  className,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: "h3" | "h4";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("flex min-w-0 flex-col", className)}>
      <CardHeader className="min-h-9 flex-row items-start justify-between gap-3 px-5 pt-5">
        <div className="grid min-w-0 gap-0.5 self-center">
          <CardTitle as={as}>{title}</CardTitle>
          {description && (
            <CardDescription className="leading-5">
              {description}
            </CardDescription>
          )}
        </div>
        {action}
      </CardHeader>
      {children}
    </Card>
  );
}

export function BlockBody({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("grid flex-1 content-start gap-4 px-5 py-4", className)}
      {...props}
    />
  );
}

export function BlockFooter({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 px-5 pb-5", className)}
      {...props}
    />
  );
}
