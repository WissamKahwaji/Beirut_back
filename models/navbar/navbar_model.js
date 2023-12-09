import mongoose from "mongoose";


const navSchema = new mongoose.Schema({
    home: Boolean,
    aboutUs: Boolean,
    contactUs: Boolean,
    products: Boolean,
    orders: Boolean,
});



export const navbarModel = mongoose.model('NavBar', navSchema);