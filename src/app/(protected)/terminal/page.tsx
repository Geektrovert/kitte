"use client";

import { useEffect, useState } from "react";
import satori from "satori";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import T1 from "@/components/templates/neobrutal";
import T2 from "@/components/templates/memphis";

// --- Async Font Loader for Browser (WOFF only for Satori) ---
async function loadFontsAndPolyfill() {
  if (typeof window === "undefined") return [];
  const [inter, interBold, calSans, materialIcons, Segmenter] =
    window.__resource ||
    (window.__resource = await Promise.all([
      fetch("/fonts/inter-latin-ext-400-normal.woff").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/fonts/inter-latin-ext-700-normal.woff").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/fonts/CalSans-SemiBold.woff").then((res) => res.arrayBuffer()),
      fetch("/fonts/material-icons-base-400-normal.woff").then((res) =>
        res.arrayBuffer()
      ),
      !globalThis.Intl || !globalThis.Intl.Segmenter
        ? createIntlSegmenterPolyfill(
            fetch(
              new URL(
                "intl-segmenter-polyfill/dist/break_iterator.wasm",
                import.meta.url
              )
            )
          )
        : null,
    ]));
  if (Segmenter) {
    globalThis.Intl = globalThis.Intl || {};
    // @ts-expect-error: Assigning polyfilled Segmenter to global Intl object for Satori compatibility
    globalThis.Intl.Segmenter = Segmenter;
  }
  const fonts = [
    inter && { name: "Inter", data: inter, weight: 400, style: "normal" },
    interBold && {
      name: "Inter",
      data: interBold,
      weight: 700,
      style: "normal",
    },
    calSans && { name: "CalSans", data: calSans, weight: 600, style: "normal" },
    materialIcons && {
      name: "Material Icons",
      data: materialIcons,
      weight: 400,
      style: "normal",
    },
  ].filter(Boolean);
  return fonts;
}

const posterTemplates = [
  { title: "Neo Brutal", Component: T1 },
  { title: "Memphis", Component: T2 },
];

export default function Page() {
  const { data: session, isPending, error } = authClient.useSession();
  const [posters, setPosters] = useState<{ title: string; svg: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function renderPosters() {
      const fonts = await loadFontsAndPolyfill();
      const satoriConfig = {
        width: "100%",
        height: "100%",
        embedFont: true,
        fonts,
        className: "w-full aspect-video rounded-lg",
      };
      const rendered = await Promise.all(
        posterTemplates.map(async ({ title, Component }) => {
          // Render the React component to SVG string
          const svg = await satori(<Component />, satoriConfig);
          return { title, svg };
        })
      );
      if (!cancelled) setPosters(rendered);
    }
    renderPosters();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Failed to load user</div>;

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
              {posters.map(({ title, svg }) => (
                <div
                  key={title}
                  className="flex flex-col items-center w-full h-full overflow-hidden"
                >
                  <div dangerouslySetInnerHTML={{ __html: svg }} />
                  <div className="mt-2 text-center font-bold">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
