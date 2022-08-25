import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json"
import { Product } from 'types'




const getSheets = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { product } = req.query
  const credentials2 = JSON.parse(
    Buffer.from(process.env.secret!, 'base64').toString()
  )
  await extractSheets(
    {
      spreadsheetKey: process.env.sheet_key,
      credentials: credentials2,
      sheetsToExtract: ["items"],
    },
    function (err: Error, data: any) {
      if(req.query.product){
        console.log(req.query.product)
      const currentProduct = data.items.find((item: Product) => item.id === req.query.product!)
      console.log(currentProduct)
      const arr = data.items
      res.status(200).send({ arr })}
    }
  );
}
export default getSheets

