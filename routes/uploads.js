const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo } = require('../controllers/uploadsController')

const router = Router();

router.get('/', cargarArchivo);

module.exports = router;