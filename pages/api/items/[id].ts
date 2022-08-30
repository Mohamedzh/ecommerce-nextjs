import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json"
import { Color, DetailedProduct, Highlights, Image, Product, Quantity, Size } from 'types'


const getSheets = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query
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
      if (req.query.id) {
        console.log(req.query.id)
        let highlights = data.highlights.filter((item: Highlights) => item.id === req.query.id)
        let images = data.images.filter((item: Image) => item.id === req.query.id)
        let colors = data.colors.filter((item: Color) => item.id === req.query.id)
        let newSizes = data.sizes.filter((item: Size) => item.id === req.query.id)
        let sizes = newSizes.map((size:Size)=>{
          return {...size, inStock:JSON.parse(size.inStock)}
        })

        let quantities = data.colorSizesQty.filter((item: Quantity) => item.id === req.query.id)
        let currentProduct = data.items.find((item: DetailedProduct) => item.id === req.query.id)
        currentProduct = { ...currentProduct, highlights, images, colors, sizes, quantities }
        res.status(200).send({ currentProduct, highlights, images, colors, sizes, quantities })
      }
    }
  );
}
export default getSheets

