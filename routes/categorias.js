const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', (req, res) =>  {
     res.json('get')
})

//Obtener una categoria por id - publico
router.get('/:id', (req, res) =>  {
    res.json('get - id')
})

//Crear categoria - privado - cualquiera con un token valido
router.post('/', (req, res) =>  {
    res.json('post')
})

//Actualizar categoria - privado - cualquiera con un token valido
router.put('/:id', (req, res) =>  {
    res.json('put')
})

//Borrar categoria - Role Admin
router.delete('/:id', (req, res) =>  {
    res.json('delete')
})
module.exports = router;