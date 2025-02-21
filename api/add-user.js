const {
  Bitbucket
} = require('bitbucket')
const Envato = require("envato");
const repomap = require("./repomap.js");
const bitbucket_token = process.env.BITBUCKET_KEY;
const envato_token = process.env.ENVATO_KEY;
// const envato = new Envato.Client(envato_token);

const clientOptions = {
  auth: {
      token: bitbucket_token,
  },
}

const bitbucket = new Bitbucket(clientOptions)

async function addUSerToRepo(req, res) {
  const data = JSON.parse(req.body);

  try {
    //   const sale = await envato.private.getSale(data.purchase_code);

    //   const itemID = sale.item.id;
    //   const reponame = repomap[itemID];
      if (true) {
          bitbucket.repositories.updateUserPermission({
                  workspace: 'open-listings',
                  repo_slug: 'open-listings-pro',
                  selected_user_id: data.username,
                  _body: {
                      permission: 'read'
                  }
              })
              .then((gitdata) => {

                  if (gitdata.status == 201) {
                      res.status(200).send({
                          status: 200,
                          message: "Succesfully Invited. Please check your email",
                      });
                  } else if (gitdata.status == 204) {
                      res.status(200).send({
                          status: 204,
                          message: "User is already a Collaborator",
                      });
                  }
              })
              .catch((err) => {
                  console.log(err);
                  res.status(400).send({
                      status: 400,
                      message: "Invite Failed. Please check your Username",
                  });
              });
      } else if (itemID) {
          res.status(400).send({
              status: 400,
              message: "This Template Repo is not available in Github",
          });
      } else {
          res
              .status(400)
              .send({
                  status: 400,
                  message: "Cannot validate your Purchase"
              });
      }
  } catch (error) {
      console.log("envato fetch error:", error);
      res
          .status(400)
          .send({
              status: 400,
              message: "Could not verify Purchase Code"
          });
  }
}

module.exports = (req, res) => addUSerToRepo(req, res);