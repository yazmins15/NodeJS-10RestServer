const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt')
const { verify } = require ('../helpers/google-verify')

const login = async(req, res = response) => {

  const {correo, password} = req.body;
  try{
    //Verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      });
    }

    //Verificar si el usuario está activo
    if(!usuario.estado){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
       return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);


    res.json({
      msg: 'Login OK',
      usuario,
      token
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: 'Ocurrio un error, favor de ponerse en contacto con el administrador'
    });
  }
  

}

const googleSignIn = async(req, res = response) =>{

  const { id_token } = req.body;
  //console.log("EN GOOGLE SIGN IN  "+id_token)
  try{     
    //const googleUser = await verify(id_token);
    //console.log("--GoogleUser--")
    //console.log(googleUser)
    const { nombre, img, correo} = await verify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if(!usuario){
      const data = {
        nombre,
        correo,
        password: 'a',
        rol: 'USER_ROLE',
        img,
        google: true
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if(!usuario.estado){
      return res.status(401).json({
         msg: 'Hable con el administrador, usuario eliminado'
      })
    }

      //Generar el JWT
    const token = await generarJWT(usuario.id);

       res.json({
         msg: 'Todo OK',
         usuario,
         token
       })   
   }catch(error){
    console.log(error)
     res.status(400).json({
       ok: false,
       error,
       msg: 'El token no se pudo verificar'
     })
  } 
}

module.exports = {
  login,
  googleSignIn
}