import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json"
import { Product, Size } from 'types'




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
      sheetsToExtract: ["items", "highlights", "images", "colors", "sizes", "colorSizesQty"],
    },
    function (err: Error, data: any) {
      if (req.query.product) {
        console.log(req.query.product)
        let highlights = data.highlights.filter((item: Product) => item.id === req.query.product)
        let images = data.images.filter((item: Product) => item.id === req.query.product)
        let colors = data.colors.filter((item: Product) => item.id === req.query.product)
        let newSizes = data.sizes.filter((item: Product) => item.id === req.query.product)
        let sizes = newSizes.map((size:any)=>{
          return {...size, inStock:JSON.parse(size.inStock)}
        })

        let quantities = data.colorSizesQty.filter((item: Product) => item.id === req.query.product)
        let currentProduct = data.items.find((item: Product) => item.id === req.query.product)
        currentProduct = { ...currentProduct, highlights, images, colors, sizes, quantities }
        res.status(200).send({ currentProduct, highlights, images, colors, sizes, quantities })
      }
    }
  );
}
export default getSheets

