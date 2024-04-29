import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://balaganesh:123123123@cluster0.ugdm5ix.mongodb.net/food-del').then(() => console.log("DB Connected"));
}