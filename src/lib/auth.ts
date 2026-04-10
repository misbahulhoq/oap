import jwt from "jsonwebtoken";

export type AuthTokenPayload = {
  id: string;
  email: string;
  role: "admin" | "user";
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function signAccessToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
