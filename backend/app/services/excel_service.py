import json
import pandas as pd

from io import BytesIO

from app.services.llm import generate_dashboard_metadata
from app.services.kpi import generate_kpis


async def process_excel(file):

    content = await file.read()

    df = pd.read_excel(BytesIO(content))

    metadata = {
        "columns": list(df.columns),
        "shape": df.shape,
        "dtypes": df.dtypes.astype(str).to_dict(),
        "head": df.head(5).to_dict(orient="records"),
        "missing_values": df.isnull().sum().to_dict(),
        "duplicate_rows": int(df.duplicated().sum())
    }

    llm_response = generate_dashboard_metadata(
        metadata
    )

    dashboard_config = json.loads(
        llm_response
    )
    kpi_data = generate_kpis(
        df,
        dashboard_config["kpis"]
    )

    return {
    "dashboard_title":
        dashboard_config["dashboard_title"],

    "dataset_type":
        dashboard_config["dataset_type"],

    "kpis":
        kpi_data,

    "charts":
        dashboard_config["charts"]
    }