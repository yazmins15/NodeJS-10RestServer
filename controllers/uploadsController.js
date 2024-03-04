const { response } = require('express');
const { subirArchivo } = require('../helpers');

/* instalar :
npm i express-fileupload
npm i uuid
*/
const cargarArchivo = async (req, resp = response) => {
   
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        resp.status(400).json({msg : 'No se han subido archivos'});
        return;
    }

    try {
        //Imagenes 
        //const nombre = await subirArchivo(req.files);
        const nombre = await subirArchivo(req.files,['txt','pdf']);
        resp.json({ nombre });
        
    } catch (ex) {
        resp.status(400).json({ex})
    }
        
    /*
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];

    //Validar la extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extension)){
        return resp.status(400).json({
            msg: `La extensión ${ extension } no es permitida, estas son las permitidas: ${ extensionesValidas}`
        })
    }
    
    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname + '../uploads' + nombreTemp);

    archivo.mv(uploadPath, (err) => {
        if(err){
            return resp.status(500).send(err);
        }
        resp.json({msg: 'El archivo se subio correctamente a '+uploadPath})
    });

    resp.json({
        msg: 'Cargando Archivos'
    });
    */
}

module.exports = {
    cargarArchivo
}