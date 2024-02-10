"use client"; // Error components must be Client Components

import { useEffect } from "react";
import NotFound from "./not-found";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <NotFound />;
}
