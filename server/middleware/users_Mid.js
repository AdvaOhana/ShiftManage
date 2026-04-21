let tableName = "users";

async function AddUser(req, res, next) {

    let name = req.body.name || "";
    let email = req.body.email || "";
    let password = req.body.password || "";
    let role = req.body.role || "worker";

    res.ok = false;
    res.err = "";

    if (name === "" || email === "" || password === "") {
        res.err = "wrong parameters";
        return next();
    }

    let Query = `INSERT INTO ${tableName} (name,email,password,role) VALUES (?,?,?,?)`;
    let values = [name, email, password, role];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        res.err = "something went wrong";
        return res.status(500).json({ status: "ERROR", Query, values, err: res.err });
    }

    res.ok = true;
    res.insertId = rows.insertId;

    next();
}

async function GetAllUsers(req, res, next) {

    let Query = `SELECT name,email,role,createdAt FROM ${tableName} ORDER BY name`;

    res.ok = false;
    res.err = "";

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, []);

    if (rows === false) {
        res.err = "something went wrong";
        return res.status(500).json({ status: "ERROR", Query, err: res.err });
    }

    res.ok = true;
    req.AllUsers = rows;

    next();
}

async function UpdateUser(req, res, next) {

    let id = req.params.id || -1;

    if (id < 0) {
        return res.status(500).json({ status: "ERROR", message: "id is not valid" })
    }

    res.ok = false;
    res.err = "";

    let getQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
    let existingUser = await GenObj_Mid.QueryExecSimpleReply(getQuery, [id]);

    if (!existingUser || existingUser.length === 0) {
        return res.status(404).json({ status: "ERROR", getQuery, message: "User not found" });
    }
    let user = existingUser[0];

    let name = req.body.name !== undefined ? req.body.name : user.name;
    let email = req.body.email !== undefined ? req.body.email : user.email;
    let role = req.body.role !== undefined ? req.body.role : user.role;

    let Query = `UPDATE ${tableName} SET name=?, email=?, role=? WHERE id=?`;
    let values = [name, email, role, id];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        res.err = "something went wrong";
        return res.status(500).json({ status: "ERROR", Query, values, err: res.err });
    }

    res.ok = true;

    next();
}

async function DeleteUser(req, res, next) {

    let id = req.params.id || -1;

    let Query = `DELETE FROM ${tableName} WHERE id=?`;

    let values = [id];

    res.ok = false;

    if (id < 0) {
        return res.status(500).json({ status: "ERROR", message: "id is not valid" });
    }
    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);
    if (rows === false) {
        res.err = "something went wrong";
        return res.status(500).json({ status: "ERROR", Query: Query, err: res.err, values: values });
    }
    res.ok = true;

    next();

}

export default {
    AddUser,
    GetAllUsers,
    UpdateUser,
    DeleteUser
};