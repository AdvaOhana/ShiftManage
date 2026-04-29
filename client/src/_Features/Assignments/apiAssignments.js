const section = "assignments";
const backURL = import.meta.env.VITE_BACK_URL;

async function GetAllAssignments() {
    let url = `${backURL}/${section}/List`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'accept': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) throw new Error("error");

    return response.json();
}

async function AddAssignment(data) {
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

async function UpdateAssignment(data) {
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

async function DeleteAssignment(id) {
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
    GetAllAssignments,
    AddAssignment,
    UpdateAssignment,
    DeleteAssignment
};