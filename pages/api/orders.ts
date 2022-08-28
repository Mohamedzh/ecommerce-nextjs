import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'



const getSheets = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const {
    orderId,
    emailAddress,
    firstName,
    lastName,
    company,
    address,
    apartment,
    city,
    country,
    region,
    postalCode,
    phone,
    paymentMethod,
    deliveryMethod,
    cart

  } = req.body
  const doc = new GoogleSpreadsheet(process.env.sheet_key);

  const credentials = JSON.parse(
    Buffer.from(process.env.secret!, 'base64').toString()
  )
  await doc.useServiceAccountAuth(
    {
      private_key: credentials.private_key,
      client_email: credentials.client_email!,
    })

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle['orders'];
  const sheet2 = doc.sheetsByTitle['orderDetails']

  const newOrder = await sheet.addRow({
    orderId, emailAddress, firstName, lastName,
    company, address, apartment, city, country, region, postalCode, phone, paymentMethod,
    deliveryMethod
  });

  for (let i = 0; i < cart.length; i++) {
    const orderDetails = await sheet2.addRow({
      orderId, item: cart[i].name, count: cart[i].quantity, price: cart[i].price,
      subtotal: cart[i].quantity * Number(cart[i].price)
    });
  }

  res.send('order created successfully')
}
export default getSheets