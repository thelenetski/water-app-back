import {HttpError} from 'http-errors';

export const errorHander = (err, req, res, next) => {
    if(err instanceof HttpError) {
        res.status(err.status).json({
            status:err.status,
            message:err.message,
            error:err
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: err.message
    });
};