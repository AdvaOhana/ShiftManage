import express from 'express';
const router = express.Router();

import assignments_Mid from "../middleware/assignments_Mid.js";

router.post("/Add", [assignments_Mid.AddAssignment], (req, res) => {
    if (res.ok)
        res.status(200).json({ message: "OK", Last_Id: res.insertId });
    else
        return res.status(500).json({ message: res.err });
});

router.put("/Update/:id", [assignments_Mid.UpdateAssignment], (req, res) => {
    if (res.ok)
        res.status(200).json({ message: "OK" });
    else
        return res.status(500).json({ message: res.err });
});

router.delete("/Delete/:id", [assignments_Mid.DeleteAssignment], (req, res) => {
    if (res.ok)
        res.status(200).json({ message: "OK" });
    else
        return res.status(500).json({ message: res.err });
});

router.get("/List", [assignments_Mid.GetAllAssignments], (req, res) => {
    if (res.ok) {
        res.status(200).json(req.AssignmentsData);
    }
    else
        return res.status(500).json({ message: res.err });
});

export default router;
