import crypto from "node:crypto";

const hashIpAddress = (ipAddress) =>
  crypto
    .createHash("sha256")
    .update(String(ipAddress || "unknown"))
    .digest("hex");

export { hashIpAddress };
