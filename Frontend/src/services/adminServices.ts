const API_URL = "http://localhost:5178/api";

export async function loginAdmin(correo: string, contrasena: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo_electronico: correo,
            contrasena: contrasena
        })
    });

    return response.ok;
}