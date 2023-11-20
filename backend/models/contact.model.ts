import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId, // _id from mongoDB
        required: true,
        ref: "User", // Reference for the model in database
    },
    name: {
        type: String,
        required: [true, "Please add the contact name!"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address!"]
    },
    phone: {
        type: Number,
        required: [true, "Please add the contact number!"]
    },
}, {timestamps:true}); // time stamps enables the time at which a data schema has been created
// or the time at which a new contact is created

export default mongoose.model("Contact",contactSchema);