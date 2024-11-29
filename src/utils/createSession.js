import crypto from "node:crypto";
import { ONE_MONTH, SIXTY_MINUTES } from "../constants/index.js";

export const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString("base64");
  const refreshToken = crypto.randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + SIXTY_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_MONTH);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
