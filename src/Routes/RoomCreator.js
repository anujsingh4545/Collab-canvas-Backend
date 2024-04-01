import {CreateId} from "../Controllers/CreateId.js";

import {Router} from "express";
import {saveFile} from "../Controllers/SaveFile.js";
import ExpressFormidable from "express-formidable";
import {VerifyUser} from "../Middleware/Verify.js";
import {RoomData} from "../Controllers/RoomData.js";

const route = Router();

route.post("/createId", CreateId);
route.post("/saveFile", ExpressFormidable(), saveFile);
route.post("/getdata", VerifyUser, RoomData);

export default route;
