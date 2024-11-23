import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {signup} from "../services/auth.js";
import createHttpError from "http-errors";

export const signUpController = ctrlWrapper(async (req, res) => {
    const user = await signup(req.body);

    if(!user) throw createHttpError(400, "Something went wrong");

    req.res(201).send({
        status: 201,
        message: "Successfully created user"
    });
});

export const signInController = ctrlWrapper(async (req, res) => {

});

export const logoutController = ctrlWrapper((req, res) => {

});

export const currenUserController = ctrlWrapper((req, res) => {

});

export const refreshUserController = ctrlWrapper((req, res) => {

});