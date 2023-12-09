import { logoModel } from "../models/logo/logo_model.js";



export const getLogoData = async (req, res) => {
    try {

        const logoData = await logoModel.findOne();


        return res.status(200).json(logoData);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Something went wrong");
    }
};

export const addLogoData = async (req, res) => {
    try {


        const logoImgPath = req.files && req.files['logoImg'] ? req.files['logoImg'][0].path : null;
        const logoUrlImg = logoImgPath ? 'http://localhost:5000/' + logoImgPath.replace(/\\/g, '/') : null;

        const mainLogoImgPath = req.files && req.files['mainLogoImg'] ? req.files['mainLogoImg'][0].path : null;
        const mainLogUrlImg = mainLogoImgPath ? 'http://localhost:5000/' + mainLogoImgPath.replace(/\\/g, '/') : null;


        const newLogoData = new logoModel({
            logoData: logoUrlImg,
            mainLogo: mainLogUrlImg,
        });


        await newLogoData.save();


        return res.status(201).json("Logo data added successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Something went wrong");
    }
};