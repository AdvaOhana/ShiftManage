let tableName = "shifts";


async function AddShift(req, res, next) {

    let name = req.body.name || "";
    let start = req.body.start || "";
    let end = req.body.end || "";

    res.ok = false;
    res.err = "";

    if (name === "" || start === "" || end === "") {
        res.err = "wrong parameters";
        return next();
    }

    let Query = `INSERT INTO ${tableName} (name,start,end) VALUES (?,?,?)`;
    let values = [name, start, end];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;
    res.insertId = rows.insertId;

    next();
}


async function GetShifts(req, res, next) {

    let Query = `SELECT * FROM ${tableName} ORDER BY name`;

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, []);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query });
    }

    res.ok = true;
    req.ShiftsData = rows;

    next();
}

async function UpdateShift(req, res, next) {

    let id = req.params.id || -1;
    if (id < 0) {
        return res.status(500).json({ status: "ERROR", message: "id is not valid" })
    }

    let name = req.body.name || "";
    let start = req.body.start || "";
    let end = req.body.end || "";

    res.ok = false;
    res.err = "";

    if (name === "" || start === "" || end === "") {
        res.err = "wrong parameters";
        return next();
    }

    let Query = `UPDATE ${tableName} SET name=?, start=?, end=? WHERE id=?`;
    let values = [name, start, end, id];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        return res.status(500).json({ status: "ERROR", Query, values });
    }

    res.ok = true;
    next();
}

async function DeleteShift(req, res, next) {

    let id = req.params.id || -1;
    if (id < 0) {
        return res.status(500).json({ status: "ERROR", message: "id is not valid" })
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


export default {
    AddShift,
    GetShifts,
    UpdateShift,
    DeleteShift
};