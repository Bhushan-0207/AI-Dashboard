DASHBOARD_PROMPT = """
You are an expert Business Intelligence Dashboard Architect.

Analyze the dataset metadata below.

DATASET:

{metadata}

Your job:

1. Identify dataset type.
2. Identify dimensions.
3. Identify measures.
4. Suggest KPI cards.
5. Suggest top 5 dashboard charts.
6. Suggest dashboard title.

KPI rules:
-Only use these aggregations:

-sum
-mean
-count
-max
-min
-nunique

-Do not create KPI formulas.

-Do not create KPIs that require multiple columns.

Rules:

- Use ONLY existing columns.
- Do not create fake columns.
- Charts must be useful.
- Dashboard should work for any dataset.

Return ONLY valid JSON.

Format:

{
    "dashboard_title": "",
    "dataset_type": "",

    "dimensions": [],

    "measures": [],

    "kpis": [
        {
            "title": "",
            "column": "",
            "aggregation": ""
        }
    ],

    "charts": [
        {
            "title": "",
            "chart_type": "",
            "x_axis": "",
            "y_axis": "",
            "aggregation": ""
        }
    ]
}
"""