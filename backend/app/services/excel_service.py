import json
import pandas as pd
import numpy as np

from io import BytesIO
from app.services.preprocessing import preprocess_data, clean_json
from app.services.llm import generate_dashboard_metadata
from app.services.kpi import generate_kpis
from app.services.chart import generate_charts


async def process_excel(file):

    content = await file.read()
    filename = file.filename.lower()


    if filename.endswith(".xlsx") or filename.endswith(".xls"):

        dataFrame = pd.read_excel(
            BytesIO(content)
        )


    elif filename.endswith(".csv"):

        dataFrame = pd.read_csv(
            BytesIO(content)
        )
    else:
        raise ValueError(
        "Only Excel and CSV files are supported"
    )


    df = preprocess_data(dataFrame)
    print(df.describe())
    print(df.head(10))
    print(df.dtypes)
    print(df.shape)

    metadata = {
        "columns": list(df.columns),
        "shape": df.shape,
        "dtypes": df.dtypes.astype(str).to_dict(),
        "head": clean_json(df.head(5).to_dict(orient="records")),
        "missing_values": df.isnull().sum().to_dict(),
        "duplicate_rows": int(df.duplicated().sum())
    }

    llm_response = generate_dashboard_metadata(metadata)

    dashboard_config = json.loads(llm_response)

    kpi_data = generate_kpis(df,dashboard_config["kpis"])

    chart_data = generate_charts(df,dashboard_config["charts"])

    return clean_json({
    "dashboard_title":
        dashboard_config["dashboard_title"],
    "dataset_type":
        dashboard_config["dataset_type"],
    "kpis":
        kpi_data,
    "charts":
        chart_data
    })