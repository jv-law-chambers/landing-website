"use client";

import React, { useEffect, useState } from "react";
import { TinaCMS, TinaProvider } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text"; // Import for potential Rich Text rendering
import TinaProviderComponent from "../../../../tina/tina-provider"; // Adjust path if needed

// Dynamically load the TinaCMS admin UI
const TinaAdmin = React.lazy(() => import("tinacms").then(m => m.TinaAdmin));

const AdminPage = () => {
  // You might not need TinaProvider here if tina-provider handles it,
  // but keep it for potential direct CMS usage if needed.
  // const [cms] = useState(() => {
  //   const cms = new TinaCMS({
  //     // Your TinaCMS config options if not using tina-provider approach
  //     // Example: apiURL, mediaStore, etc.
  //     // See Tina docs for full config: https://tina.io/docs/reference/configure/
  //   });
  //   return cms;
  // });

  return (
    // Wrap with the TinaProviderComponent which handles the CMS instance
    <TinaProviderComponent>
      {/* Use Suspense to handle the dynamic import */}
      <React.Suspense fallback={<div>Loading Tina Admin...</div>}>
        <TinaAdmin />
      </React.Suspense>
    </TinaProviderComponent>
  );
};

export default AdminPage;
