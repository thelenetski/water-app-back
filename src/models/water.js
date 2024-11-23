import {Schema, model} from "mongoose";

const waterSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Water = model("Water", waterSchema);