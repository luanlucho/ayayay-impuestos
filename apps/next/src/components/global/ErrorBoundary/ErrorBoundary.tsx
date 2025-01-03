"use client";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { ErrorBoundaryProp as Props } from "./ErrorBoundary.types";
import MessageBoundary from "../MessageBoundary/MessageBoundary";

const defaultDescription =
  "Try coming back later or contact support if the problem persists.";

const ErrorBoundary = (props: Props) => {
  const { className, error, reset, title = "Something went wrong" } = props;
  const { buttonText = "Try again", onClick = () => reset() } = props;
  const { description = defaultDescription } = props;

  useEffect(() => {
    // TODO: send to logger
    console.error(error);
  }, [error]);

  return (
    <MessageBoundary
      className={twMerge("ErrorBoundary", className)}
      title={title}
      description={description}
      buttonText={buttonText}
      // Attempt to recover by trying to re-render the segment
      onClick={onClick}
    />
  );
};

export default ErrorBoundary;
