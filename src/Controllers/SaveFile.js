import {FileUpload} from "./FileUpload.js";
import User from "../Model/User.js";

export const saveFile = async (req, res) => {
  const {name, image, userId, url, Id, writeData, drawData} = req.fields;

  if (name && image && userId && url && Id && writeData && drawData) {
    try {
      const fileData = await FileUpload(image);

      if (fileData) {
        const userData = await User.findById(userId);

        const filteredArray = userData.saved.filter((item) => item.get("id") !== Id);

        userData.saved = filteredArray;

        await userData.save();

        userData.saved.push({
          id: Id,
          name,
          Imageurl: fileData.url,
          pageUrl: url,
          writeData,
          drawData,
          time: new Date(),
        });

        await userData.save();

        return res.status(200).send({
          message: "File uploaded Successfully !🤌🏼",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(403).send({
        message: "Something went wrong!",
        success: false,
      });
    }
  }
};
