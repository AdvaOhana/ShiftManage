let tableName = "assignments";


async function AddAssignment(req, res, next) {

    let user_id = req.body.user_id || -1;
    let start = req.body.start || "";
    let end = req.body.end || "";
    let shift_id = req.body.shift_id || null;
    let date = req.body.date || "";

    res.ok = false;
    res.err = "";

    if (user_id < 0) {
        res.err = "wrong user id";
        return next();
    }
    if (shift_id) {

        if (date === "") {
            res.err = "date is required when using shift";
            return next();
        }

        let shift = await GenObj_Mid.QueryExecSimpleReply("SELECT * FROM shifts WHERE id=?", [shift_id]);

        if (shift === false) {
            return res.status(500).json({ status: "ERROR", message: "DB error" });
        }

        if (shift.length === 0) {
            res.err = "shift not found";
            return next();
        }

        start = `${date} ${shift[0].start}`;
        end = `${date} ${shift[0].end}`;
    } else {
        if (start === "" || end === "") {
            res.err = "start date/end date required if no shift";
            return next();
        }
    }

    if (new Date(start) >= new Date(end)) {
        res.err = "invalid time range";
        return next();
    }

    let QueryCheck = `SELECT * FROM ${tableName} WHERE user_id = ? AND (start < ? AND end > ?)`;
    let valuesCheck = [user_id, end, start];

    let checkRows = await GenObj_Mid.QueryExecSimpleReply(QueryCheck, valuesCheck);

    if (checkRows === false) {
        return res.status(500).json({ status: "ERROR", Query: QueryCheck, values: valuesCheck });
    }

    if (checkRows.length > 0) {
        res.err = "user already assigned in this time";
        return next();
    }


    let QueryCheck1 = `SELECT * FROM unavailability WHERE user_id = ? AND (start < ? AND end > ?)`;
    let valuesCheck1 = [user_id, end, start];

    let checkRows1 = await GenObj_Mid.QueryExecSimpleReply(QueryCheck1, valuesCheck1);

    if (checkRows1 === false) {
        return res.status(500).json({ status: "ERROR", Query: QueryCheck1, values: valuesCheck1 });
    }

    if (checkRows1.length > 0) {
        res.err = "user not available in this time";
        return next();
    }


    let Query = `INSERT INTO ${tableName} (user_id,shift_id, start, end) VALUES (?, ?, ?, ?)`;
    let values = [user_id, shift_id, start, end];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;
    res.insertId = rows.insertId;

    next();
}


async function UpdateAssignment(req, res, next) {

    let id = req.params.id || -1;
    let start = req.body.start || "";
    let end = req.body.end || "";
    let shift_id = req.body.shift_id || null;
    let date = req.body.date || "";

    res.ok = false;
    res.err = "";

    if (id < 0) {
        res.err = "id not valid";
        return next();
    }
    if (shift_id) {

        if (date === "") {
            res.err = "date is required when using shift";
            return next();
        }

        let shift = await GenObj_Mid.QueryExecSimpleReply("SELECT * FROM shifts WHERE id=?", [shift_id]);

        if (shift === false) {
            return res.status(500).json({ status: "ERROR", message: "DB error" });
        }

        if (shift.length === 0) {
            res.err = "shift not found";
            return next();
        }

        start = `${date} ${shift[0].start}`;
        end = `${date} ${shift[0].end}`;
    } else {
        if (start === "" || end === "") {
            res.err = "start date/end date required if no shift";
            return next();
        }
    }

    if (new Date(start) >= new Date(end)) {
        res.err = "invalid time range";
        return next();
    }

    let QueryCheck = `SELECT * FROM ${tableName} WHERE user_id = ( SELECT user_id FROM ${tableName} WHERE id = ? ) AND id != ? AND (start < ? AND end > ?)`;
    let valuesCheck = [id, id, end, start];

    let rowsCheck = await GenObj_Mid.QueryExecSimpleReply(QueryCheck, valuesCheck);

    if (rowsCheck === false) {
        return res.status(500).json({ status: "ERROR", Query: QueryCheck, values: valuesCheck });
    }

    if (rowsCheck.length > 0) {
        res.err = "user already assigned in this time";
        return next();
    }


    let QueryCheck1 = `SELECT * FROM unavailability WHERE user_id = ( SELECT user_id FROM ${tableName} WHERE id = ? ) AND (start < ? AND end > ?)`;
    let valuesCheck1 = [id, end, start];

    let rowsCheck1 = await GenObj_Mid.QueryExecSimpleReply(QueryCheck1, valuesCheck1);

    if (rowsCheck1 === false) {
        return res.status(500).json({ status: "ERROR", Query: QueryCheck1, values: valuesCheck1 });
    }

    if (rowsCheck1.length > 0) {
        res.err = "user not available in this time";
        return next();
    }


    let Query = `UPDATE ${tableName} SET start=?, end=?, shift_id=? WHERE id=?`;
    let values = [start, end, shift_id, id];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;

    next();
}


async function DeleteAssignment(req, res, next) {

    let id = req.params.id || -1;

    res.ok = false;

    if (id < 0) {
        return res.status(500).json({ status: "ERROR", message: "id not valid" });
    }

    let Query = `DELETE FROM ${tableName} WHERE id=?`;
    let values = [id];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;

    next();
}


async function GetAllAssignments(req, res, next) {

    let Query = `SELECT * FROM ${tableName} ORDER BY start`;

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, []);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query });
    }

    res.ok = true;
    req.AssignmentsData = rows;

    next();
}


export default {
    AddAssignment,
    UpdateAssignment,
    DeleteAssignment,
    GetAllAssignments
};