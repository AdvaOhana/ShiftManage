const section = "users";
const backURL = import.meta.env.VITE_BACK_URL;

async function GetAllUsers() {
    let url = `${backURL}/${section}/List`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'accept': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) throw new Error("error");

    return response.json();
}

async function AddUsers(data) {
    let url = `${backURL}/${section}/Add`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });

    if (!response.ok) throw new Error("error");

    return response.json();
}

async function UpdateUsers(data) {
    let url = `${backURL}/${section}/Update/${data.id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });

    if (!response.ok) throw new Error("error");

    return response.json();
}

async function DeleteUsers(id) {
    let url = `${backURL}/${section}/Delete/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'accept': 'application/json' },
        credentials: 'include'
    });
    if (!response.ok) throw new Error("error");
    return response.json();
}

export {
    GetAllUsers,
    AddUsers,
    UpdateUsers,
    DeleteUsers
};