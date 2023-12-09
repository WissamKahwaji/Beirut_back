import { navbarModel } from "../models/navbar/navbar_model.js";


export const getNavData = async (req, res) => {
    try {
        const navData = await navbarModel.findOne();
        return res.status(200).json({
            message: 'Success',
            data: navData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const addNavData = async (req, res) => {
    try {
        const { home, aboutUs, contactUs, products, orders } = req.body;


        const newNavBarrData = new navbarModel({ home, aboutUs, contactUs, products, orders });


        await newNavBarrData.save();

        return res.status(201).json({
            message: 'NavBar added successfully',
            data: newNavBarrData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



export const editNavBarData = async (req, res) => {
    try {
        // const { id } = req.params;
        const { home, aboutUs, contactUs, products, orders } = req.body;
        console.log(home);
        const navBarData = await navbarModel.findOne();
        console.log(navBarData);
        if (!navBarData) {
            return res.status(404).json({ message: "NavBar not found" });
        }
        if (typeof home !== 'undefined' && home !== null) navBarData.home = home;
        if (typeof aboutUs !== 'undefined' && aboutUs !== null) navBarData.aboutUs = aboutUs;
        if (typeof contactUs !== 'undefined' && contactUs !== null) navBarData.contactUs = contactUs;
        if (typeof products !== 'undefined' && products !== null) navBarData.products = products;
        if (typeof orders !== 'undefined' && orders !== null) navBarData.orders = orders;



        await navBarData.save();
        console.log(navBarData);
        return res.status(201).json({
            message: 'NavBar Edited successfully',
            data: navBarData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};