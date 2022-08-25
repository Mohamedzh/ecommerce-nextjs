import { google, sheets_v4 } from "googleapis";
import { GaxiosResponse } from "googleapis-common";
import type { NextApiRequest, NextApiResponse } from 'next'


// type Data = {data:GaxiosResponse<sheets_v4.Schema$ValueRange>}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new google.auth.JWT(
      process.env.client_email, "../../.././process.env", process.env.private_key, ['https://www.googleapis.com/auth/spreadsheets']
    );

    client.authorize(async function (err, tokens) {
      // if (err) {
      //   return res.status(400).send(JSON.stringify({ error: true }));
      // }

      const sheet = google.sheets({ version: 'v4', auth: client });

      //CUSTOMIZATION FROM HERE
      const opt = {
        spreadsheetId: '1l2YilJsbBPG4d1hPX6PrVTXsqpUX06AEWIkh1Q6ecec',
        range: 'orders'
      };

      let data = await sheet.spreadsheets.values.get(opt);
      let x = data.data.values!.map(item => Object.assign({},item))
      return res.send(x);
    });
  } catch (e) {
    console.log(e);
  }
}