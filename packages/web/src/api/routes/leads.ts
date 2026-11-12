import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { subscribers, enquiries } from "../database/schema";

const limits = new Map<string, { count: number; until: number }>();
function checkRate(headers: Headers) {
  const key =
    headers.get("cf-connecting-ip") || headers.get("x-forwarded-for")?.split(",")[0] || "shared";
  const now = Date.now();
  if (limits.size > 10000) for (const [k, v] of limits) if (v.until < now) limits.delete(k);
  const current = limits.get(key);
  if (current && current.until > now) {
    if (current.count >= 12)
      throw new ORPCError("TOO_MANY_REQUESTS", {
        message: "Please wait a few minutes before trying again.",
      });
    current.count++;
  } else limits.set(key, { count: 1, until: now + 600000 });
}
const email = z.string().trim().toLowerCase().email().max(254);
export const leads = {
  subscribe: base
    .input(z.object({ email, consent: z.literal(true), website: z.string().max(0) }))
    .handler(async ({ input, context }) => {
      checkRate(context.headers);
      await db
        .insert(subscribers)
        .values({ email: input.email, consent: true })
        .onConflictDoNothing();
      return { ok: true };
    }),
  contact: base
    .input(
      z.object({
        name: z.string().trim().min(2).max(100),
        email,
        occasion: z.enum([
          "Everyday sparkle",
          "Wedding or celebration",
          "Retail or hospitality",
          "Something else",
        ]),
        message: z.string().trim().min(10).max(3000),
        consent: z.literal(true),
        website: z.string().max(0),
      }),
    )
    .handler(async ({ input, context }) => {
      checkRate(context.headers);
      await db
        .insert(enquiries)
        .values({
          name: input.name,
          email: input.email,
          occasion: input.occasion,
          message: input.message,
        });
      return { ok: true };
    }),
};
