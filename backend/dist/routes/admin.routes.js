"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/getAllCompanies').get((req, res) => new admin_controller_1.AdminController().getAllCompanies(req, res));
adminRouter.route('/activateCompany').post((req, res) => new admin_controller_1.AdminController().activateCompany(req, res));
adminRouter.route('/deactivateCompany').post((req, res) => new admin_controller_1.AdminController().deactivateCompany(req, res));
const nodemailer = require("nodemailer");
const cors = require('cors');
adminRouter.options('/sendmail', cors());
adminRouter.post('/sendmail', cors(), (req, res) => {
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
                path: './grb_slike/suncani_breg.png',
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
});
exports.default = adminRouter;
//# sourceMappingURL=admin.routes.js.map