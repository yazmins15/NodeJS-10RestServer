const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

async function verify(token = '') {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  //const payload = ticket.getPayload();
  const { name, picture, email } = ticket.getPayload();
  //console.log(payload);

  return {
    nombre: name,
    img: picture,
    correo: email,
  }
}
//verify().catch(console.error);

module.exports = {
  verify
}
