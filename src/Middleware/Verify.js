import jwt from "jsonwebtoken";
import "dotenv/config";

export const VerifyUser = async (req, res, next) => {
  const temp = req.headers["authorization"];

  if (!temp) {
    return res.status(400).send({
      messsage: "no token found",
      stats: false,
    });
  }

  const token = temp.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.JWTSECRET);
    if (!verify || typeof verify == "string") {
      return res.status(400).send({
        message: "verification failed",
        success: false,
      });
    }

    req.body.userId = verify.id;
    next();
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",

      success: false,
    });
  }
};
