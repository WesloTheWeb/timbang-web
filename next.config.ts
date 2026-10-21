import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    // Prepends src/styles/variables.scss to every .scss file, so global
    // $variables work in any module without an import.
    loadPaths: [path.join(process.cwd(), "src/styles")],
    additionalData: `@use "variables" as *;`,
  },
};

export default nextConfig;
