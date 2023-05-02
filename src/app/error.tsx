"use client";

import { useEffect } from "react";
import { EmptyState } from "~/components/EmptyState";

type ErrorStateProps = {
  error: Error;
};

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something wong!!!" />;
};

export default ErrorState;
