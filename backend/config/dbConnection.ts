require("dotenv").config();
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL || "");
        console.log(`Database connected: `, connect.connection.host, connect.connection.name)
    } catch (err:any) {
        return new Error(err.message);
        process.exit(1); // exit the process if any error is encountered
    }
};

export default connectDb;