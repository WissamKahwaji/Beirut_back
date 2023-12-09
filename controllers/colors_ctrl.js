import { ColorsModel } from "../models/colors/color_model.js";


export const getColors = async (req, res) => {
    try {
        const colors = await ColorsModel.findOne();
        return res.status(200).json({
            message: 'Success',
            data: colors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const addColors = async (req, res) => {
    try {
        const { mainColor, navColor, linear, secondaryColor } = req.body;


        const newColor = new ColorsModel({ mainColor, navColor, linear, secondaryColor });


        await newColor.save();

        return res.status(201).json({
            message: 'Color added successfully',
            data: newColor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const editColors = async (req, res) => {
    try {
        const { mainColor, navColor, linear, secondaryColor } = req.body;
        const updatedData = {};


        if (mainColor) {
            updatedData.mainColor = mainColor;
        }
        if (navColor) {
            updatedData.navColor = navColor;
        }
        if (linear) {
            updatedData.linear = linear;
        }
        if (secondaryColor) {
            updatedData.secondaryColor = secondaryColor;
        }


        const colors = await ColorsModel.findOne();
        if (!colors) {
            return res.status(404).json({ message: 'Colors not found' });
        }


        colors.set(updatedData);
        await colors.save();

        return res.status(200).json({
            message: 'Colors updated successfully',
            data: colors,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

