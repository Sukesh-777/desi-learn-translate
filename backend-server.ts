// backend-server.ts

import { Application, Router, Request } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

// Import the core logic from your original function files
import { handleRequest as ocrHandler } from "./supabase/functions/ocr/index.ts";
import { handleRequest as ragQaHandler } from "./supabase/functions/rag-qa/index.ts";
import { handleRequest as translateHandler } from "./supabase/functions/translate/index.ts";

const app = new Application();
const router = new Router();

console.log("Setting up API routes...");

// Create an endpoint for each function.
// It calls the imported handler and returns its response.
router
  .post("/ocr", async (ctx) => {
    const response = await ocrHandler(ctx.request.originalRequest as Request);
    ctx.response.status = response.status;
    ctx.response.body = response.body;
    response.headers.forEach((val, key) => ctx.response.headers.set(key, val));
  })
  .post("/rag-qa", async (ctx) => {
    const response = await ragQaHandler(ctx.request.originalRequest as Request);
    ctx.response.status = response.status;
    ctx.response.body = response.body;
    response.headers.forEach((val, key) => ctx.response.headers.set(key, val));
  })
  .post("/translate", async (ctx) => {
    const response = await translateHandler(ctx.request.originalRequest as Request);
    ctx.response.status = response.status;
    ctx.response.body = response.body;
    response.headers.forEach((val, key) => ctx.response.headers.set(key, val));
  });

// Use CORS to allow your front-end to connect
app.use(oakCors({ origin: "*" }));
app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
console.log(`🚀 Server is ready and listening on http://localhost:${port}`);
await app.listen({ port });