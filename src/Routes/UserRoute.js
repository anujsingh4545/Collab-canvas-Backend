import {Router} from "express";
import {Getuser, LoginUser, deleteFile, getFiles} from "../Controllers/UserController.js";
import {VerifyUser} from "../Middleware/Verify.js";

const route = Router();

route.post("/login", LoginUser);
route.post("/getuser", VerifyUser, Getuser);
route.post("/getFile", VerifyUser, getFiles);
route.post("/deleteFile", VerifyUser, deleteFile);

export default route;
