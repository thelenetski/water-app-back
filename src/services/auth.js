import {Users} from "../models/users.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
export const signup = async (paylaod) => {

    const isUserExist = await Users.findOne({email: paylaod.email});

    if(isUserExist) throw createHttpError(409, 'User already exists');

    const encryptedPassword = await bcrypt.hash(paylaod.password, 10);

    return await Users.create({email: paylaod.email, password: encryptedPassword});
};