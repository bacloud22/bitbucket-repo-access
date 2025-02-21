// const { Bitbucket } = require("bitbucket");
const Envato = require("envato");
const repomap = require("./repomap.js");
const nodemailer = require("nodemailer");

// const bitbucket_token = process.env.BITBUCKET_KEY;
const envato_token = process.env.ENVATO_KEY;
// const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const envato = new Envato.Client(envato_token);

// const clientOptions = {
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
// };

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: USERNAME,
      pass: PASSWORD
    }
  });

const sender = {
  address: "hello@example.com",
  name: "ENVATO $$$$",
};
const recipients = ["contact@open-listings.net"];

// const bitbucket = new Bitbucket(clientOptions);

async function addUSerToRepo(req, res) {
  const data = JSON.parse(req.body);

  try {
    const sale = await envato.private.getSale(data.purchase_code);
    const itemID = sale.item.id;
    const reponame = repomap[itemID];
    if (reponame) {
      // TODO: enrich repomap
      await transport
        .sendMail({
          from: sender,
          to: recipients,
          subject: "ENVATO $$",
          text: `Congrats: Username: ${data.username} purchased ${itemID}`, //
          category: "Integration Test",
          sandbox: true,
        })
        .then(console.log, console.error);
    }
  } catch (error) {
    console.log("envato fetch error:", error);
    res.status(400).send({
      status: 400,
      message: "Could not verify Purchase Code",
    });
  }
}

module.exports = (req, res) => addUSerToRepo(req, res);
