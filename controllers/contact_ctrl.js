import { contactContentModel } from "../models/contactUs/contact_content_model.js";
import { contactModel } from "../models/contactUs/contact_us_model.js";

export const getContactData = async (req, res) => {
  try {
    const contactData = await contactModel.findOne().populate("content");
    return res.status(200).json(contactData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const addContactData = async (req, res) => {
  try {
    const { title, content } = req.body;
    let urlImg;
    if (req.files) {
      const imgPath = req.files["img"][0].path;
      urlImg =
        "https://www.rallyback.siidevelopment.com/" +
        imgPath.replace(/\\/g, "/");
    }

    const newContent = new contactContentModel({
      titleOne: content.titleOne,
      titleTwo: content.titleTwo,
      phoneNumber: content.phoneNumber,
      mobileOne: content.mobileOne,
      mobileTwo: content.mobileTwo,
      location: content.location,
      email: content.email,
      emailOne: content.emailOne,
      poBox: content.emailTwo,
      whatsApp: content.whatsApp,
      faceBook: content.faceBook,
      linkedIn: content.linkedIn,
      instagram: content.instagram,
      threads: content.threads,
      snapChat: content.snapChat,
      googleMap: content.googleMap,
    });

    const savedContent = await newContent.save();

    const newContact = new contactModel({
      title,
      img: urlImg,
      content: savedContent._id,
    });

    const savedContact = await newContact.save();

    return res.status(201).json({
      message: "Contact data created successfully",
      data: savedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editContactData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const contact = await contactModel.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (title) {
      contact.title = title;
    }

    if (content) {
      if (content.titleOne) {
        contact.content.titleOne = content.titleOne;
      }
      if (content.titleTwo) {
        contact.content.titleTwo = content.titleTwo;
      }

      if (content.phoneNumber) {
        contact.content.phoneNumber = content.phoneNumber;
      }
      if (content.location) {
        contact.content.location = content.location;
      }
      if (content.email) {
        contact.content.email = content.email;
      }
      if (content.emailOne) {
        contact.content.emailOne = content.emailOne;
      }
      if (content.emailTwo) {
        contact.content.emailTwo = content.emailTwo;
      }
      if (content.mobileOne) {
        contact.content.mobileOne = content.mobileOne;
      }
      if (content.mobileTwo) {
        contact.content.mobileTwo = content.mobileTwo;
      }
      if (content.whatsApp) {
        contact.content.whatsApp = content.whatsApp;
      }
      if (content.faceBook) {
        contact.content.faceBook = content.faceBook;
      }
      if (content.linkedIn) {
        contact.content.linkedIn = content.linkedIn;
      }
      if (content.instagram) {
        contact.content.instagram = content.instagram;
      }
    }

    const updatedContact = await contact.save();

    return res.status(200).json({
      message: "Contact data updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteContactData = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactModel.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const contactContentData = await contactContentModel.findByIdAndRemove(
      contact.content
    );

    await contact.remove();

    return res.status(200).json({
      message: "Contact data deleted successfully",
      data: contact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
