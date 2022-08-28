import type { NextApiRequest, NextApiResponse } from 'next'
import { SMTPClient } from 'emailjs';
import sgMail from '@sendgrid/mail'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email, orderId } = req.body;

    //     const client = new SMTPClient({
    //         user: process.env.email,
    //         password: process.env.password,
    //         host: 'smtp.yahoo.com',
    //         ssl: true
    //     });
    //     try {
    //         const message = await client.sendAsync(
    //             {
    //                 text: `Your order is confirmed`,
    //                 from: `ecommerce, ${process.env.email}`,
    //                 to: 'mohamed.zahran1@live.com',
    //                 subject: 'order confirmed',
    //             }, 
    //         ); 
    //         console.log(message)
    //         res.send('email sent')
    //     }
    //     catch (e) {
    //         res.status(400).end(JSON.stringify({ message: "Error" }))
    //     }
    console.log(req.body)
    sgMail.setApiKey(process.env.emailKey!);
    const msg = {
        to: `tawwr_ecommerce@yahoo.com`,
        from: 'mohamed.zahran1@live.com',
        subject: 'New order confirmation',
        text: `your order number ${orderId} is confirmed`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail
        .send(msg)
        .then((msg) => { console.log(msg) }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });

    // (async () => {
    //     try {
    //       await sgMail.send(msg);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   })();

    // res.send(msg)
}