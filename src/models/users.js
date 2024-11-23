import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female'],
        default: 'female'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        toLowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: false,
        default: 0
    },
    sportParticipation: {
        type: Number,
        required: false,
        default: 0
    },
    dailyNorm: {
        type: Number,
        required: false,
        default: 1500
    },
    avatar:{
        type: String,
        required: false,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const Users = model('User', userSchema);
