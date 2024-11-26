import {Users} from "../models/users.js";

export const editUser = async ({id, payload}) => {
    return Users.findOneAndUpdate({_id: id}, payload, {
        new: true,
        includeResultMetadata: false,
    });
};