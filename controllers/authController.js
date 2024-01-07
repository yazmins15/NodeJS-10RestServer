const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

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

module.exports = {
  login
}