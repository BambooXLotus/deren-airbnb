"use client";

import { useRouter } from "next/navigation";
import { Heading } from "./Heading";
import { Button } from "./Button";

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try another filter",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
