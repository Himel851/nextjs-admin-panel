import { createHmac, randomBytes } from "crypto";

/** Creates `id.signature` where signature is hex HMAC-SHA256 of id (Node / Server Actions only). */
export function createAdminSessionToken(secret: string): string {
  const id = randomBytes(32).toString("hex");
  const sig = createHmac("sha256", secret).update(id).digest("hex");
  return `${id}.${sig}`;
}
