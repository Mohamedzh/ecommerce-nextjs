import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'



const getSheets = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const doc = new GoogleSpreadsheet('1l2YilJsbBPG4d1hPX6PrVTXsqpUX06AEWIkh1Q6ecec');

  const credentials = JSON.parse(
    Buffer.from(process.env.secret!, 'base64').toString()
  )
  await doc.useServiceAccountAuth(
    {
      private_key: credentials.private_key,
      client_email: credentials.client_email!,
    })

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  // await doc.updateProperties({ title: 'renamed doc' });

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  console.log(sheet.title);
  console.log(sheet.rowCount);

  const rows = await sheet.getRows(); // can pass in { limit, offset }
  console.log(rows[1])


  // adding / removing sheets
  // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
  // await newSheet.delete();
  // res.json(rows)
}
export default getSheets