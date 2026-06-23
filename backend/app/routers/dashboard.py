from fastapi import APIRouter, UploadFile, File,HTTPException

from app.services.excel_service import process_excel

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    try:
        result = await process_excel(file)

        return result
    except Exception as e :
        print("error",e)
        raise HTTPException(status_code=500, detail=str(e))