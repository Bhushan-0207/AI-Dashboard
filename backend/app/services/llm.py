import os
import json
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("API_KEY")

from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from app.prompts.dashboard_prompt import DASHBOARD_PROMPT


llm = ChatOpenAI(
    model="openai/gpt-oss-120b:free",
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)


def generate_dashboard_metadata(metadata):

    prompt = DASHBOARD_PROMPT.replace(
        "{metadata}",
        json.dumps(metadata, indent=2)
    )

    response = llm.invoke(prompt)

    return response.content