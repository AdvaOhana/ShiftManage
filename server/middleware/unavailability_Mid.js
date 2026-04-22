let tableName = "unavailability";


async function AddUnavailability(req, res, next) {
    let user_id = req.body.user_id || -1;
    let start = req.body.start || "";
    let end = req.body.end || "";

    res.ok = false; 
    res.err = "";

    if (user_id < 0 || start === "" || end === "") {
        res.err = "wrong parameters";
        return next();
    }
    
    if(new Date(start) >= new Date(end)){
    res.err = "invalid time range";
    return next();
    }

    let QueryCheck = `SELECT * FROM ${tableName} WHERE user_id = ? AND (start < ? AND end > ?)`;
    let valuesCheck = [user_id, end, start];

    let checkRows = await GenObj_Mid.QueryExecSimpleReply(QueryCheck, valuesCheck);

    if (checkRows === false) {
        res.err = "something went wrong during overlap check";
        return res.status(500).json({ status: "ERROR", Query: QueryCheck, values: valuesCheck, err: res.err });
    }

    if (checkRows.length > 0) {
        res.err = "overlapping unavailability exists";
        return next();
    }

    let Query = `INSERT INTO ${tableName} (user_id,start,end) VALUES (?,?,?)`;
    let values = [user_id, start, end];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;
    res.insertId = rows.insertId;

    next();
}


async function UpdateUnavailability(req, res, next) {
    let id = req.params.id || -1;
    let start = req.body.start || "";
    let end = req.body.end || "";

    res.ok = false;
    res.err = "";

    if (id < 0 || start === "" || end === "") {
        res.err = "wrong parameters";
        return next();
    }
        if (new Date(start) >= new Date(end)) {
        res.err = "invalid time range";
        return next();
    }
        let QueryCheck = `SELECT * FROM ${tableName} WHERE id != ? AND user_id = (SELECT user_id FROM ${tableName} WHERE id = ?) AND (start < ? AND end > ?)`;
    let valuesCheck = [id, id, end, start];

    let checkRows = await GenObj_Mid.QueryExecSimpleReply(QueryCheck, valuesCheck);

    if (checkRows === false) {
        res.err = "something went wrong during overlap check";
        return res.status(500).json({ status: "ERROR", Query: QueryCheck, values: valuesCheck, err: res.err });
    }

    if (checkRows.length > 0) {
        res.err = "overlapping unavailability exists";
        return next();
    }

    let Query = `UPDATE ${tableName} SET start_datetime=?,end_datetime=? WHERE id=?`;
    let values = [start, end, id];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;

    next();
}


async function DeleteUnavailability(req, res, next) {
    let id = req.params.id || -1;

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


async function GetAllUnavailability(req, res, next) {
    let Query = `SELECT * FROM ${tableName} ORDER BY start`;

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, []);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query });
    }

    res.ok = true;
    req.UnavailabilityData = rows;

    next();
}


export default { AddUnavailability, UpdateUnavailability, DeleteUnavailability, GetAllUnavailability };