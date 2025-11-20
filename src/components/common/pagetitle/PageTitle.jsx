import React from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ page }) => {
  const appName = "GG"; // Replace with dynamic name if needed
  return (
    <Helmet>
      <title>{page ? `${page} | ${appName}` : appName}</title>
    </Helmet>
  );
};

export default PageTitle;
