require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const isAuthorized = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new Error("User is not authorized or token is missing");
        }

        const token = authHeader.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        req.user = decoded.user;
        next();
    } catch (error:any) {
        res.status(401);
        throw new Error("User not authorized!");
    };
});

export default isAuthorized;
