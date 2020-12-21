const { Articulo, Categoria } = require('../models/');

module.exports =
    {    
        list  : async (req, res, next) => {

            try {
                const art = await Articulo.findAll({

                    include: [{
                        model : Categoria,
                        as: 'categoria'
                    }]
                });
                res.status(200).json(art)
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
                next(error)
            }

        },
        add  : async (req, res, next) => {

            try {
                const art = await Articulo.create( req.body );
                res.status(200).json(art)
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
                next(error)
            }
            
        },
        update  : async (req, res, next) => {

            try {
                const art = await Articulo.update( {nombre: req.body.nombre, descripcion: req.body.descripcion, categoriaId: req.body.categoria, codigo: req.body.codigo},{ where: {id : req.body.id} });
                res.status(200).json(art)
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
            next(error)
            }
            
        },
        activate  : async (req, res, next) => {
            
            try {
                const art = await Articulo.update( {estado: 1},{ where: {id : req.body.id} });
                res.status(200).json(art)
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
            next(error)
            }
        },
        deactivate  : async (req, res, next) => {

            try {
                const art = await Articulo.update( {estado: 0},{ where: {id : req.body.id} });
                res.status(200).json(art)
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
            next(error)
            }
            
        }
     
}


