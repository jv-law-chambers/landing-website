"use client";
import React from "react";
import { TinaProvider, TinaCMS } from "tinacms";
import { useTina } from "tinacms/dist/react"; // Correct import for useTina hook
import client from "./client"; // Assuming client is configured in client.ts

// This provider component wraps your application or specific pages/layouts
// where you want TinaCMS editing capabilities available.

const TinaProviderComponent = ({ children }: { children: React.ReactNode }) => {
  // If you need to pass data fetched server-side and make it editable:
  // Example: const { data } = useTina({ query, variables, data: serverSideData });
  // For just enabling the admin UI, you might not need useTina here directly.

  return (
    <TinaProvider cms={client}>
      {children}
    </TinaProvider>
  );
};

export default TinaProviderComponent;
