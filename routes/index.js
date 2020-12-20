const routerx = require('express-promise-router');
const usuarioRouter = require('./usuario');
const articuloRouter = require('./articulo');
const catergoriaRouter = require('./categoria');


const router = routerx();

router.use('/usuario', usuarioRouter);
router.use('/articulo', articuloRouter);
router.use('/categoria', catergoriaRouter);

module.exports = router;