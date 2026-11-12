import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "../src/web/pages/landing";
const path = resolve(import.meta.dir, "../dist/index.html");
const html = await readFile(path, "utf8");
const markup = renderToString(
  <QueryClientProvider client={new QueryClient()}>
    <Landing />
  </QueryClientProvider>,
);
await writeFile(path, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
console.log("Pre-rendered landing content for crawling without JavaScript.");
