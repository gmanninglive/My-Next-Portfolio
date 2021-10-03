const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    secure: true,
    port: 465,
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL,
      pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
    },
    
  })

export default function handler(req, res) {
  if (req.method == "POST") {
    const { from_name, from_email, message } = req.body.values
      let mailData = {
        from: `"Gmanningdev Bot", <${process.env.NEXT_PUBLIC_GMAIL}>`,
        to: "gmanningdev@gmail.com",
        subject: `Message From ${from_name} | ${from_email}`,
        text:  `${message} | Sent from: ${from_email}`,
       }

    transporter.sendMail(mailData, function (err, info) {
        if(err)
        {
          console.log(err)
          res.status(400).send(err);
        }
        else
        {
          console.log(info)
          res.status(200).send("Email Sent");
        }
      })

    
  }
}
