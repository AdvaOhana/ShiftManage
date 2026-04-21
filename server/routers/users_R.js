import express from 'express';
const router = express.Router();

import users_Mid from "../middleware/users_Mid.js";

router.post("/Add", [users_Mid.AddUser], (req, res) => {
    if (res.ok)
        res.status(200).json({ message: "OK", Last_Id: res.insertId });
    else
        return res.status(500).json({ message: res.err });
});

router.put("/Update/:id", [users_Mid.UpdateUser], (req, res) => {
    if (res.ok)
        res.status(200).json({ message: "OK" });
    else
        return res.status(500).json({ message: res.err });
});

router.delete("/Delete/:id", [users_Mid.DeleteUser], (req, res) => {
    if (res.ok)
        res.status(200).json({ message: "OK" });
    else
        return res.status(500).json({ message: res.err });
});

router.get("/List", [users_Mid.GetAllUsers], (req, res) => {
    if (res.ok) {
        res.status(200).json(req.AllUsers);
    }
    else
        return res.status(500).json({ message: res.err });
});

export default router;
