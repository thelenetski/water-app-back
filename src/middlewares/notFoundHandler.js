import createHttpError from "http-errors";

export const notFoundHandler = (req, res) => {
    throw new createHttpError(404, 'Not Found');
};
