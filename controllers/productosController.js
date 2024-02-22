const { response, request } = require('express');
const Producto = require('../models/producto');

//Obtener productos - paginado
const productosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado : true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit(Number(limite))
    ]);
    
    res.json({
        total,
        productos,
    });
}

//Obtener producto por id 
const productoGetById = async(req = request, res = response) => {
    const { id } = req.query;
    
    const productos = await Producto.findById(id)
                                    .populate('categoria','nombre');
    
    res.json({ productos });

}

//Crear un producto
const productoPost = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const { categoria, descripcion } = req.body;

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre} ya existe `, 
        });
    }

   //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria,
        descripcion
    }

    const producto = new Producto (data);

    //Guardar DB 
    await producto.save();
    res.status(201).json(producto);

}

//Actualizar producto 
const productoPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json({ producto });
}

//Eliminar producto 
const productoDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, {new: true});

    res.json({ producto });
}

module.exports = {
    productosGet,
    productoGetById,    
    productoPost,
    productoPut,
    productoDelete,
  };