import express from 'express'
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js"
import login from "./Routes/auth/Login.js"
import signup from "./Routes/auth/Signup.js"
import verify from "./Routes/auth/verifyToken.js"
import addBranch from "./Routes/manageBranch/addBranch.js"
import getBranch from "./Routes/manageBranch/getBranch.js"
import deleteBranch from "./Routes/manageBranch/deleteBranch.js"
import editBranch from "./Routes/manageBranch/editBranch.js"
import getManager from "./Routes/manageManagers/getManagers.js"
import getMenu from "./Routes/manageMenu/getItems.js"
import addItem from "./Routes/manageMenu/addItem.js"
import editItem from "./Routes/manageMenu/editItem.js"
import deleteItem from "./Routes/manageMenu/deleteItem.js"
import addBooking from "./Routes/manageBooking/addBooking.js"
import getBooking from "./Routes/manageBooking/getBooking.js"
import addOrder from "./Routes/manageOrders/addOrder.js"



const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

app.listen(port, () => {
	console.log(`Server is listening from port ${port}.`);
    db();

});

//auth
app.use("/api/login",login);
app.use("/api/signup",signup);
app.use("/api/verifyToken",verify)

//manageBranch
app.use("/api/addBranch",addBranch);
app.use("/api/getBranches",getBranch);
app.use("/api/deleteBranches",deleteBranch);
app.use("/api/editBranch",editBranch);

//manageManager
app.use("/api/getManagers",getManager);

//manageMenu
app.use("/api/getMenu", getMenu);
app.use("/api/addItem", addItem);
app.use("/api/editItem", editItem);
app.use("/api/deleteItem", deleteItem);

//manageBooking
app.use("/api/addBooking", addBooking);
app.use("/api/getBooking", getBooking);

//manageOrder
app.use("/api/addOrder", addOrder);


app.use('/uploads', express.static('uploads'));
