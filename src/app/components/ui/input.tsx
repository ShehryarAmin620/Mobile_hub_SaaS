import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-gray-900 placeholder:text-gray-400 selection:bg-blue-600 selection:text-white bg-white border-gray-200 flex h-9 w-full min-w-0 rounded-lg border px-3 py-2 text-sm text-gray-900 transition-all duration-200 ease-in-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500 aria-invalid:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };