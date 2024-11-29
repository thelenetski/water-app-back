import { Users } from "../models/users.js";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import createHttpError from "http-errors";
import { createSession } from "../utils/createSession.js";
import { Sessions } from "../models/sessions.js";
import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from "../utils/googleOAuth2.js";

export const signup = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await Users.findOne({ email: email });

  if (isUserExist) throw createHttpError(409, "User already exists");

  const encryptedPassword = await bcrypt.hash(password, 10);

  return await Users.create({ email: email, password: encryptedPassword });
};

export const signin = async (payload) => {
  const { email, password } = payload;

  const user = await Users.findOne({ email: email });

  if (!user) throw createHttpError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw createHttpError(404, "Passwords do not match");

  await Sessions.deleteOne({ userId: user._id });

  const session = createSession();

  return Sessions.create({ userId: user._id, ...session });
};

export const logout = async (payload) => {
  const { _id } = payload;

  const session = await Sessions.findOne({ userId: _id });

  if (!session) throw createHttpError(404, "User not found");

  await Sessions.deleteOne({ userId: _id });
};

export const getCurrentUser = async (payload) => {
  const { _id } = payload;

  const user = await Users.findById(_id);

  if (!user) throw createHttpError(404, "User not found");

  return user;
};

export const refreshUser = async (payload) => {
  const { _id } = payload;

  const session = await Sessions.findOne({ userId: _id });

  if (!session) throw createHttpError(404, "User not found");

  if (new Date() > new Date(session.accessTokenValidUntil))
    throw new createHttpError(401, "Session expired");

  const newSession = createSession();

  await Sessions.deleteOne({ _id: session._id });

  return await Sessions.create({
    userId: session.userId,
    ...newSession,
  });
};

/*-------------------GOOGLE AUTH--------------------*/
export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await Users.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await Users.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
      role: "parent",
    });
  }

  const newSession = createSession();

  return await Sessions.create({
    userId: user._id,
    ...newSession,
  });
};
