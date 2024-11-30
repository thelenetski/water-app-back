import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import {env} from "./env.js";

dotenv.config();

cloudinary.config({
    cloud_name: env("CLOUDINARY_NAME"),
    api_key: env("CLOUDINARY_API_KEY"),
    api_secret: env("CLOUDINARY_API_SECRET"),
    secure: true
});

export const saveFileToCloudinary = async (file) => {
    const response = await cloudinary.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
};