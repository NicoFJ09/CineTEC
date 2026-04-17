const API_URL = "https://localhost:7071/api";

export async function loginAdmin(correo: string, contrasena: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo_Electronico: correo,
            contrasena: contrasena
        })
    });

    return response.ok;
}