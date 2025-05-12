import { createClient } from "tinacms/dist/client";
import { TinaCMS } from "tinacms"; // Import TinaCMS for instantiation if needed

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const client = new TinaCMS({
  branch: branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!, // Use non-null assertion or handle undefined
  token: process.env.TINA_TOKEN!, // Use non-null assertion or handle undefined - Be careful with server-only tokens
  // Other client configurations if necessary
  // apiURL: `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}` // Example API URL structure
   build: {
     outputFolder: "admin",
     publicFolder: "public",
   },
   media: {
     tina: {
       mediaRoot: "uploads", // Store media in public/uploads
       publicFolder: "public",
     },
   },
   // Ensure the schema is referenced here if not using defineConfig approach exclusively for build
   // schema: YourSchemaImport, // Import your schema if needed client-side
});

// Optionally, you can export a function to get the client if more complex setup is needed
// export const getClient = () => client;

export default client;
