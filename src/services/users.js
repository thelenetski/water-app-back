import {Users} from "../models/users.js";

export const editUser = async ({id, payload}) => {
    return Users.findOneAndUpdate({_id: id}, payload, {
        new: true,
        includeResultMetadata: false,
    });
};

export const getAllUsers = async () => {
    const [users, count] = await Promise.all([Users.find({}), Users.countDocuments({})])
    
    return {users: users.map(item => item.avatarUrl).filter(item => item !== null), count}
}