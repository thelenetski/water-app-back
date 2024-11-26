import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {logout, refreshUser, signin, signup} from "../services/auth.js";
import createHttpError from "http-errors";

export const signUpController = ctrlWrapper(async (req, res) => {
    const user = await signup(req.body);

    if(!user) throw createHttpError(400, "Bad request");

    res.status(201).send({
        status: 201,
        message: "Successfully created user"
    });
});

export const signInController = ctrlWrapper(async (req, res) => {
    const session = await signin(req.body);

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    });

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    res.status(200).send({
        status: 200,
        message: "Successfully logged in",
        data: {
            accessToken: session.accessToken
        }
    });
});

export const logoutController = ctrlWrapper(async (req, res) => {
    await logout(req.user);

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send({});
});

export const refreshUserController = ctrlWrapper(async (req, res) => {
    const session = await refreshUser(req.user);

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    });

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    });

    res.status(200).send({
        status: 200,
        message: "Successfully refreshed!",
        data: {
            accessToken: session.accessToken
        }
    });
});