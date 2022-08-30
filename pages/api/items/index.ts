import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json"
import { Color, DetailedProduct, Highlights, Image, Product, Quantity, Size } from 'types';



export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      let detailedProducts = data.items.map((item:DetailedProduct)=>{
        const images = data.images.filter((image:Image)=>image.id===item.id)
        const highlights = data.highlights.filter((highlight:Highlights)=>highlight.id===item.id)
        const colors = data.colors.filter((color:Color)=>color.id===item.id)
        const sizes = data.sizes.filter((size:Size)=>size.id===item.id)
        let quantities = data.colorSizesQty.filter((variant:Quantity) => variant.id === item.id)
        return item = {...item, images, highlights, colors, sizes, quantities}
      }
        )
      res.status(200).send( detailedProducts )
    }
  );

}
