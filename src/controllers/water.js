import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {addWater, deleteWater, editWater, getWaterByDay, getWaterByMonth} from "../services/water.js";

export const addWaterController = ctrlWrapper(async (req, res) => {
    const water = await addWater({userId: req.user._id, ...req.body});

    res.status(201).send(
        {
            status: 201,
            message: "Successfully created water",
            data: water
        }
    );
});

export const editWaterController = ctrlWrapper(async (req, res) => {
    const {id} = req.params;

    const water = await editWater({id: id, data: req.body});

    res.status(201).send({
        status: 201,
        message: "Successfully edited water",
        data: water
    });
});

export const deleteWaterController = ctrlWrapper(async (req, res) => {
    const { id } = req.params;

    const water = await deleteWater(id);

    res.status(204).send({
        status: 204,
        message: "Successfully deleted water",
        data: water
    });
});

export const getWaterController = ctrlWrapper(async (req, res) => {
    const {year, month, day} = req.query;

    const water = await getWaterByDay({_id: req.user._id, year, month, day: day});

    res.status(200).send({
        status: 200,
        message: "Successfully getting water by day",
        data: water
    });
});

export const getWaterPerMonthController = ctrlWrapper(async (req, res) => {
    const {year, month} = req.query;

    const water = await getWaterByMonth({_id: req.user._id, year, month});

    res.status(200).send({
        status: 200,
        message: "Successfully get water by month",
        data: water
    });
});
