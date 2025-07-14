import LoadingSpinner from "@workspace/ui/components/loading-spinner";
import { Skeleton } from "@workspace/ui/components/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto flex flex-col items-start gap-6">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
