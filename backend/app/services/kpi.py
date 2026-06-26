def calculate_kpi(df, kpi_config):

    column = kpi_config["column"]
    aggregation = kpi_config["aggregation"]

    if aggregation == "sum":
        value = df[column].sum()

    elif aggregation == "mean":
        value = df[column].mean()

    elif aggregation == "count":
        value = df[column].count()

    elif aggregation == "max":
        value = df[column].max()

    elif aggregation == "min":
        value = df[column].min()

    elif aggregation == "nunique":
        value = df[column].nunique()

    else:
        value = None


    # Convert numpy datatype to Python datatype
    if value is not None:

        if hasattr(value, "item"):
            value = value.item()

        if isinstance(value, (int, float)):
            value = round(value, 2)


    return {
        "title": kpi_config["title"],
        "value": value
    }


def generate_kpis(df, kpis):

    result = []

    for kpi in kpis:
        result.append(
            calculate_kpi(df, kpi)
        )

    return result