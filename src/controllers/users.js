import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {getCurrentUser} from "../services/auth.js";
import {editUser, getAllUsers} from "../services/users.js";
import {saveFileToCloudinary} from "../utils/saveFileToCloudinary.js";

export const currentUserController = async (req, res) => {
    const user = await getCurrentUser(req.user);

    res.status(200).send({
        status: 200,
        data: user
    });
};

export const editUserController = async (req, res) => {
    let fileUrl;

    if (req.file) {
        fileUrl = await saveFileToCloudinary(req.file);
    }
    const user = await editUser({id: req.user._id, payload: {...req.body, avatarUrl: fileUrl}});

    res.status(200).send({
        status: 200,
        data: user
    });
};

export const getAllUsersController = async (req,res) => {
    const {users, count} = await getAllUsers()

    res.status(200).send({
        status: 200,
        data: users,
        countOfUsers: count
    })
}
