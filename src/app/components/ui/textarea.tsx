import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-gray-200 placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 aria-invalid:ring-2 aria-invalid:ring-red-500 aria-invalid:ring-offset-2 aria-invalid:border-red-500 bg-white flex field-sizing-content min-h-16 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 transition-all duration-200 ease-in-out outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };