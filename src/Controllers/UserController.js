import User from "../Model/User.js";
import jwt from "jsonwebtoken";

export const LoginUser = async (req, res) => {
  const {name, email} = req.body;

  try {
    const userFind = await User.findOne({email: email});

    if (userFind) {
      const token = jwt.sign({id: userFind._id}, process.env.JWTSECRET);
      return res.status(200).send({
        message: `Welcome back ${userFind.name}! 🤌🏼`,
        success: true,
        user: userFind,
        token: token,
      });
    }

    const user = new User({
      name,
      email,
    });

    await user.save();

    const token1 = jwt.sign({id: user._id}, process.env.JWTSECRET);

    return res.status(200).send({
      message: `Welcome ${user.name}!🤌🏼`,
      success: true,
      user: user,
      token: token1,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const Getuser = async (req, res) => {
  const {userId} = req.body;

  try {
    const user = await User.findOne({_id: userId});

    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWTSECRET);
      return res.status(200).send({
        success: true,
        user: user,
        token: token,
      });
    } else {
      return res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getFiles = async (req, res) => {
  const {userId} = req.body;

  try {
    const userFind = await User.findById(userId);

    if (userFind) {
      return res.status(200).send({
        success: true,
        user: userFind,
      });
    } else {
      return res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: "Something went wrong !",
      success: false,
    });
  }
};

export const deleteFile = async (req, res) => {
  const {userId, fileId} = req.body;

  try {
    const userData = await User.findById(userId);

    const filteredArray = userData.saved.filter((item) => item.get("id") !== fileId);

    userData.saved = filteredArray;
    await userData.save();

    return res.status(200).send({
      message: "File deleted successfully! 🤌🏼",
      success: true,
    });
  } catch (error) {
    return res.status(403).send({
      message: "Something went wrong!",
      success: false,
    });
  }
};
