import UIDGenerator from "uid-generator";

export const CreateId = async (req, res) => {
  const uidgen = new UIDGenerator();

  try {
    const uid = await uidgen.generate();

    if (uid) {
      return res.status(200).send({
        uid: uid,
        success: true,
      });
    } else {
      return res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
    });
  }
};
