import { aboutModel } from "../models/about/about_model.js";

export const getAboutData = async (req, res) => {
  try {
    const aboutData = await aboutModel.findOne();

    return res.status(200).json(aboutData);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

// export const addAboutData = async (req, res) => {
//   try {
//     const { title, description, content } = req.body;
//     console.log(req);
//     const imgPath =
//       req.files && req.files["img"] ? req.files["img"][0].path : null;
//     const urlImg = imgPath
//       ? "https://beirutback.siidevelopment.com/" + imgPath.replace(/\\/g, "/")
//       : null;
//     console.log(req.files);
//     const contentWithFiles = content
//       ? await Promise.all(
//           content.map(async (contentItem, index) => {
//             const contentImgPath =
//               req.files && req.files[`content[${index}]['img']`][0]
//                 ? req.files[`content[${index}].img`][0].path
//                 : null;
//             const contentImgUrl = contentImgPath
//               ? "https://beirutback.siidevelopment.com/" +
//                 contentImgPath.replace(/\\/g, "/")
//               : null;

//             return {
//               img: contentImgUrl,
//               text: contentItem.text,
//             };
//           })
//         )
//       : null;

//     const newAboutData = new aboutModel({
//       img: urlImg,
//       title,
//       description,
//       content: contentWithFiles,
//     });

//     await newAboutData.save();

//     return res.status(201).json("About data added successfully");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json("Something went wrong");
//   }
// };

export const addAboutData = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;

    const contentWithImages = content.map((contentItem, index) => {
      const contentImgKey = `content[${index}].img`;
      const contentImgPath =
        req.files && req.files[contentImgKey]
          ? req.files[contentImgKey][0].path
          : null;
      return {
        ...contentItem,
        img: contentImgPath
          ? "https://beirutback.siidevelopment.com/" +
            contentImgPath.replace(/\\/g, "/")
          : null,
      };
    });

    // Create a new about instance
    const newAbout = new aboutModel({
      img: imgPath
        ? "https://beirutback.siidevelopment.com/" + imgPath.replace(/\\/g, "/")
        : null,
      title,
      description,
      content: contentWithImages,
    });

    // Save the new about to the database
    await newAbout.save();

    return res.status(201).json("About added successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const editAboutData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content } = req.body;

    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;

    const contentWithImages = content.map((contentItem, index) => {
      const contentImgKey = `content[${index}].img`;
      const contentImgPath =
        req.files && req.files[contentImgKey]
          ? req.files[contentImgKey][0].path
          : null;
      return {
        ...contentItem,
        img: contentImgPath
          ? "https://beirutback.siidevelopment.com/" +
            contentImgPath.replace(/\\/g, "/")
          : contentItem.img,
      };
    });

    const existingAbout = await aboutModel.findById(id);

    if (!existingAbout) {
      return res.status(404).json({ message: "About not found" });
    }

    existingAbout.img = imgPath
      ? "https://beirutback.siidevelopment.com/" + imgPath.replace(/\\/g, "/")
      : existingAbout.img;
    existingAbout.title = title;
    existingAbout.description = description;

    if (contentWithImages && contentWithImages.length > 0) {
      existingAbout.content.forEach((existingContent, index) => {
        if (contentWithImages[index]) {
          if (contentWithImages[index].text) {
            existingContent.text = contentWithImages[index].text;
          }
          if (contentWithImages[index].title) {
            existingContent.title = contentWithImages[index].title;
          }
        }
      });
    }

    await existingAbout.save();

    return res.status(200).json({
      message: "About data updated successfully",
      data: existingAbout,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
