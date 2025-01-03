import Link from "next/link";
import React from "react";

import MessageBoundary from "components/global/MessageBoundary/MessageBoundary";

const NotFoundPage = () => {
  return (
    <MessageBoundary
      title="Page not found"
      description="The page you are looking for does not exist."
      button={
        <Link href="/" className="w-full">
          <button className="mt-6 w-full !font-semibold">
            Go to home page
          </button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
