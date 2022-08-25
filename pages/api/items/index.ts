// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json"


export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credentials2 = JSON.parse(
    Buffer.from(process.env.secret!, 'base64').toString()
  )
  await extractSheets(
    {
      // your google spreadhsheet key
      spreadsheetKey: "1l2YilJsbBPG4d1hPX6PrVTXsqpUX06AEWIkh1Q6ecec",
      // your google oauth2 credentials or API_KEY
      
      credentials: credentials2,
      // optional: names of the sheets you want to extract
      sheetsToExtract: ["items"],
    },
    function (err: Error, data: any) {
      // console.log(data.items)
      res.status(200).send({ data })
    }
  );

}
