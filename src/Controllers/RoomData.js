import User from "../Model/User.js";

export const RoomData = async (req, res) => {
  const {userId, roomId} = req.body;

  if (userId && roomId) {
    try {
      const getUser = await User.findById(userId);

      const matchedObject = getUser.saved.find((item) => {
        return item.get("id") == roomId;
      });

      if (matchedObject) {
        return res.status(200).send({
          message: "Data fetched successfully! 🤌🏼",
          success: true,
          data: matchedObject,
        });
      } else {
        return res.status(200).send({
          message: "No Data found !",
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
  }
};
