import type { ComponentProps } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}
      {...props}
    />
  );
}
