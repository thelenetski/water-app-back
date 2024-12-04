import {Water} from "../models/water.js";
import createHttpError from "http-errors";

export const addWater = async (payload) => {
    return Water.create(payload);
};

export const editWater = async (payload) => {
    const water = await Water.findOneAndUpdate({_id: payload.id}, payload.data, {
        new: true,
        includeResultMetadata: false,
    });

    if(!water) throw createHttpError(404, 'Water not found');

    return water;
};

export const deleteWater = async (payload) => {
    const water = await Water.findOneAndDelete({_id: payload});

    if(!water) throw createHttpError(404, 'Water not found');

    return water;
};

export const getWaterByDay = async (payload) => {
    const startDate = new Date(payload.year, payload.month - 1, payload.day);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    return Water.find({userId: payload._id, date: {
            $gte: startDate,
            $lt: endDate,
        }});
};

export const getWaterByMonth = async (payload) => {
    const startDate = new Date(payload.year, payload.month - 1, 1);
    const endDate = new Date(payload.year, payload.month, 1);

    return Water.find({userId: payload._id, createdAt: {
            $gte: startDate,
            $lt: endDate,
        }});
};
