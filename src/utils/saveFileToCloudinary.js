import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const saveFileToCloudinary = async (file) => {
    const response = await cloudinary.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
};