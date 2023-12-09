import { homeModel } from "../models/home/home_model.js";



export const getHomeData = async (req, res) => {
    try {
        const homeData = await homeModel.findOne();

        return res.status(200).json(homeData);
    } catch (error) {
        console.error(error);
        res.status(500).json("Something went wrong");
    }
}


export const addHomeData = async (req, res) => {
    try {
        const {
            brandName,
            brandDesc,
        } = req.body;


        const landingImg = req.files['landingImg'][0].path;
        const logoImg = req.files['logoImg'][0].path;


        const urlLandingImg = 'http://localhost:5000/' + landingImg.replace(/\\/g, '/');
        const urlLogoImg = 'http://localhost:5000/' + logoImg.replace(/\\/g, '/');

        const newHomeData = new homeModel({
            landingImg: urlLandingImg,
            brandName,
            brandDesc,
            logoImg: urlLogoImg,
        });


        await newHomeData.save();

        return res.status(201).json({
            message: 'Home data added successfully',
            data: newHomeData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }

};
