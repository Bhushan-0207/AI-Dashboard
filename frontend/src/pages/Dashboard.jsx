import { useState } from "react";
import { uploadExcel } from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const handleUpload = async (e) => {

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await uploadExcel(formData);

            setDashboard(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleUpload}
            />

            {dashboard && (
                <pre>
                    {JSON.stringify(dashboard, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default Dashboard;