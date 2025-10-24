// 🔧 Core React
import React from "react";
import { Link } from "react-router-dom";

// 🧱 Components
import PageWrapper from "../components/common/PageWrapper";

function NotFoundPage() {
  return (
    <PageWrapper title="Page Not Found">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-sunrice-brown dark:text-sunrice-yellow mb-4">
          404
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
        >
          Return Home
        </Link>
      </div>
    </PageWrapper>
  );
}

export default NotFoundPage;