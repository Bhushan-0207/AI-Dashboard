import pandas as pd


def generate_chart(df, chart_config):

    chart_type = chart_config["chart_type"]
    x_col = chart_config["x_axis"]
    y_col = chart_config["y_axis"]
    aggregation = chart_config["aggregation"]

    # Scatter chart
    if chart_type == "scatter":

        return {
            "title": chart_config["title"],
            "type": chart_type,
            "data": [
                [x, y]
                for x, y in zip(
                    df[x_col].tolist(),
                    df[y_col].tolist()
                )
            ]
        }

    # No aggregation
    if aggregation == "none":

        result = df[[x_col, y_col]]

    else:

        result = (
            df.groupby(x_col)[y_col]
            .agg(aggregation)
            .reset_index()
        )

    return {
        "title": chart_config["title"],
        "type": chart_type,
        "categories": result[x_col].astype(str).tolist(),
        "data": result[y_col].tolist()
    }

def generate_charts(df, charts):

    result = []

    for chart in charts:

        try:
            result.append(
                generate_chart(df, chart)
            )

        except Exception as e:

            print(
                f"Chart Failed: {chart['title']}"
            )

    return result