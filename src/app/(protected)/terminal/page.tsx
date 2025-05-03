"use server";

import { headers } from "next/headers";
import Link from "next/link";
import satori from "satori";
import fs from "fs";
import path from "path";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill";

import { loadAdditionalAsset } from "@/lib/satori-assets";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import T1 from "@/components/templates/neobrutal";
import T2 from "@/components/templates/memphis";

// Ensure Intl.Segmenter is available
if (!globalThis.Intl?.Segmenter) {
  console.log("Polyfilling Intl.Segmenter");
  // Fetch the wasm file path relative to the current file
  // Adjust the path based on your project structure if needed.
  // Assuming the wasm file is in node_modules/intl-segmenter-polyfill/dist/break_iterator.wasm
  // process.cwd() might point to the project root.
  try {
    // Use path.join for better cross-platform compatibility
    const wasmPath = path.join(
      process.cwd(),
      "node_modules",
      "intl-segmenter-polyfill",
      "dist",
      "break_iterator.wasm"
    );
    // Check if file exists before reading
    if (fs.existsSync(wasmPath)) {
      const wasmBuffer = fs.readFileSync(wasmPath);
      globalThis.Intl = globalThis.Intl || {};
      // @ts-expect-error - Polyfill assignment
      globalThis.Intl.Segmenter = await createIntlSegmenterPolyfill(wasmBuffer);
    } else {
      console.warn("Intl.Segmenter polyfill WASM file not found at:", wasmPath);
      // Consider alternative paths or error handling if the file isn't found
      // For now, Satori might work but could have issues with complex text
    }
  } catch (error) {
    console.error("Error loading Intl.Segmenter polyfill:", error);
    // Handle error, Satori might fail or produce incorrect layout
  }
}

// --- Reduced Font Loading --- Keep only essential base fonts ---
const BWModelicaFontData = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/BwModelicaSS02-Bold.otf")
);
const BWModelicaFontRegularData = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/BwModelicaSS02-Regular.otf")
);
// Remove loading for Light, Black, Geist, GeistMono, CalSans
// const BWModelicaFontLightData = ...
// const BWModelicaFontBlackData = ...
// const geistFontData = ...
// const geistMonoFontData = ...
// const calSansFontData = ...

// Updated Satori Config
const satoriConfig = {
  width: 600,
  height: 450,
  embedFont: true, // Keep true to embed base fonts
  fonts: [
    // Base fonts
    {
      name: "Bw Modelica SS02",
      data: BWModelicaFontData,
      weight: 700,
      style: "normal" as const, // Add 'as const' for stricter typing if needed
    },
    {
      name: "Bw Modelica SS02",
      data: BWModelicaFontRegularData,
      weight: 400,
      style: "normal" as const,
    },
    // Remove other statically loaded fonts
    // {
    //   name: "Bw Modelica SS02",
    //   data: BWModelicaFontLightData,
    //   ...
    // },
    // ... remove Geist, GeistMono, Cal Sans ...
  ],
  // Add the dynamic asset loader
  loadAdditionalAsset: loadAdditionalAsset,
};

const posters = [
  { title: "Neo Brutal", Template: await satori(<T1 />, satoriConfig) },
  { title: "Memphis", Template: await satori(<T2 />, satoriConfig) },
];

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col h-full">
          <div className="@container/main flex flex-1 flex-col gap-2 h-full">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:gap-6">
              {posters.map(({ title, Template }) => (
                <Link
                  href={`/terminal/${title}`}
                  key={title}
                  className="flex justify-center items-center"
                >
                  <Template />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
