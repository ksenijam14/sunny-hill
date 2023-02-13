import express from 'express'
import { AdminController } from '../controllers/admin.controller';



const adminRouter = express.Router();

adminRouter.route('/getAllCompanies').get(
    (req, res)=> new AdminController().getAllCompanies(req,res)
)

adminRouter.route('/activateCompany').post(
    (req, res)=> new AdminController().activateCompany(req,res)
)

adminRouter.route('/deactivateCompany').post(
    (req, res)=> new AdminController().deactivateCompany(req,res)
)

const nodemailer = require("nodemailer");
const cors = require('cors');

adminRouter.options('/sendmail', cors());

adminRouter.post('/sendmail', cors(), (req,res)=>{
  const outputData = `
    <p>Poštovani, obaveštavamo Vas da ste postali aktivan član naše zajednice!</p>
    <p>Možete da se prijavite na svoj nalog i počnete sa oglašavanjem usluga.</p>
    <h3>Detalji naloga:</h3>
    <ul>  
      <li>Naziv firme: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <img src="cid:img" width="300px" height="300px"/>
  `;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    // port: 25,
    auth: {
        user: 'suncani.breg.avantura@gmail.com',
        pass: 'zdonnlithgojixpm'
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let HelperOptions = {
    from: 'suncani.breg.avantura@gmail.com',
    to: req.body.email,
    subject: 'Sunčani breg - aktivacija naloga',
    text: 'Hello',
    attachments: [{
      filename: 'suncani_breg.png',
      path: './grb_slike/suncani_breg.png', // path contains the filename, do not just give path of folder where images are reciding.
      cid: 'img' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
     }],
    html: outputData
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log("The message was sent!");
    console.log(info);
  });


})



export default adminRouter;
