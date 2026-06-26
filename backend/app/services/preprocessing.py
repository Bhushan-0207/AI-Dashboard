import pandas as pd
import numpy as np

def preprocess_data(df):

    # normalize columns

    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )


    # remove duplicates

    df = df.drop_duplicates()


    # convert numeric columns
    df = df.apply(
    lambda x: pd.to_numeric(x, errors="coerce")
    if x.dtype == "object"
    else x
    )


    # handle missing values

    for col in df.columns:

        if pd.api.types.is_numeric_dtype(df[col]):

            df[col] = df[col].fillna(
                df[col].median()
            )

        else:

            if df[col].isnull().sum():

                df[col] = df[col].fillna(
                    df[col].mode()[0]
                )


    # datetime

    for col in df.columns:

        if "date" in col.lower():

            df[col] = pd.to_datetime(
                df[col],
                errors="coerce"
            )


    # Outlier remover

    numeric_cols = df.select_dtypes(
        include=np.number
    ).columns


    for col in numeric_cols:


        Q1 = df[col].quantile(0.25)

        Q3 = df[col].quantile(0.75)

        IQR = Q3-Q1


        lower = Q1 - (1.5*IQR)

        upper = Q3 + (1.5*IQR)


        df = df[
            df[col].between(
                lower,
                upper
            )
        ]


    # NaN cleanup

    df = df.replace(
        {np.nan: None}
    )


    return df


def clean_json(obj):

    if isinstance(obj, dict):

        return {
            k: clean_json(v)
            for k, v in obj.items()
        }


    elif isinstance(obj, list):

        return [
            clean_json(x)
            for x in obj
        ]


    elif isinstance(obj, tuple):

        return [
            clean_json(x)
            for x in obj
        ]


    elif isinstance(obj, pd.Timestamp):

        return obj.isoformat()


    elif isinstance(obj, np.generic):

        return obj.item()


    elif isinstance(obj, float):

        if np.isnan(obj):
            return None


    return obj