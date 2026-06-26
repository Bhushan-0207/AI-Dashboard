import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const uploadExcel = (formData) =>
    API.post("/dashboard/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });