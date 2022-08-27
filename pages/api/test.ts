import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json"
import { Product } from 'types'




const getSheets = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const credentials2 = JSON.parse(
    Buffer.from(process.env.secret!, 'base64').toString()
  )
  await extractSheets(
    {
      spreadsheetKey: process.env.sheet_key,
      credentials: credentials2,
      sheetsToExtract: ["items", "highlights", "images"],
    },
    function (err: Error, data: any) {
    
    let products = data.items.filter((item:Product)=>item.id==="1")
    let highlights =data.highlights.filter((item:Product)=>item.id==="1")
    let images =data.images.filter((item:Product)=>item.id==="1")

      res.status(200).send({ products, highlights, images })
    }
  );
}
export default getSheets

