export async function getTasks() {
    try {
        const base_URL = import.meta.env.VITE_API_URL || "";
        const result = await fetch(`${base_URL}/api/tasks`);
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Unable to Retrieve Data! ", err);
        return [];
    }
}

export async function updateTask(id, payload) {
    try {
        const base_URL = import.meta.env.VITE_API_URL || "";
        const result = await fetch(`${base_URL}/api/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_completed: payload
            })
        });
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Unable to Update Data! ", err);
        return null;
    }
}

export async function addTask(payload) {
    try {
        const base_URL = import.meta.env.VITE_API_URL || "";
        const result = await fetch(`${base_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: payload,
                is_completed: false
            })
        });
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log("Unable to Add Data! ", err);
        return null;
    }
}

export async function deleteTask(id) {
    try {
        const base_URL = import.meta.env.VITE_API_URL || "";
        const result = await fetch(`${base_URL}/api/tasks/${id}`, { method: "DELETE" });
        return result.ok;
    }
    catch(err) {
        console.log("Unable to Delete Data! ", err);
        return false;
    }
}