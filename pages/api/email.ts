import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email, orderId } = req.body;
    console.log(req.body)
    sgMail.setApiKey(process.env.emailKey!);
    const msg = {
        to: `tawwr_ecommerce@yahoo.com`,
        from: 'mohamed.zahran1@live.com',
        subject: 'New order confirmation',
        text: `your order number ${orderId} is confirmed`,
        html: '<strong>Thank you for shopping at our store</strong>',
    };

    sgMail
        .send(msg)
        .then((msg) => { console.log(msg) }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });
}