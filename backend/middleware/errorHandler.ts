// custom middle ware to take care of all errors handling with
// proper json format

import { Request,Response } from "express";

const errorHandler = (err:Error,req:Request,res:Response) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({
        message: err.message,
        stackTrace: err.stack
    });
};

export default errorHandler;