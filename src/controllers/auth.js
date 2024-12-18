import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  logout,
  refreshUser,
  resetPwd,
  sendResetPwd,
  signin,
  signup,
} from "../services/auth.js";
import createHttpError from "http-errors";
import { generateAuthUrl } from "../utils/googleOAuth2.js";
import { loginOrSignupWithGoogle } from "../services/auth.js";
import { ONE_MONTH } from "../constants/index.js";

export const signUpController = ctrlWrapper(async (req, res) => {
  const session = await signup(req.body);

  if (!session) throw createHttpError(400, "Bad request");

  res.status(201).send({
    status: 201,
    message: "Successfully created user",
    data: {
      accessToken: session.accessToken,
    },
  });
});

export const signInController = ctrlWrapper(async (req, res) => {
  const session = await signin(req.body);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });

  res.status(200).send({
    status: 200,
    message: "Successfully logged in",
    data: {
      accessToken: session.accessToken,
    },
  });
});

export const logoutController = ctrlWrapper(async (req, res) => {
  await logout(req.user);

  res.clearCookie("refreshToken", {
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });
  res.clearCookie("sessionId", {
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });

  res.status(204).send({});
});

export const refreshUserController = ctrlWrapper(async (req, res) => {
  const session = await refreshUser(req.cookies);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });

  res.status(200).send({
    status: 200,
    message: "Successfully refreshed!",
    data: {
      accessToken: session.accessToken,
    },
  });
});

/*-------------------GOOGLE-AUTH-------------------*/
export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: "Successfully get Google OAuth url!",
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
    sameSite: "None", // Для кросс-доменных запросов
    secure: true,
  });

  res.json({
    status: 200,
    message: "Successfully logged in via Google OAuth!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const sendResetPwdController = async (req, res) => {
  const { email } = req.body;

  await sendResetPwd({ email: email });

  res.status(200).send({
    status: 200,
    message: "Successfully send reset password on email",
    data: {},
  });
};

export const resetPwdController = async (req, res) => {
  const { token, password } = req.body;

  const user = await resetPwd({ token, password });

  res.status(200).send({
    status: 200,
    message: "Successfully reset!",
    data: user,
  });
};
