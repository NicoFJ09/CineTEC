const API_URL = "https://localhost:7071/api";

export async function obtenerTodosCines() {
    const response = await fetch(`${API_URL}/cine/allcinemas`);
    const data = await response.json();
    return data;
}

export async function obtenerCinePorNombre(nombre: string) {
    const response = await fetch(`${API_URL}/cine/${nombre}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
}