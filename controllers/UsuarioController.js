const { Usuario } = require('../models/');
const bcrypt = require('bcryptjs')
const servtoken = require('../services/token')

module.exports=
    {    
        register : async (req, res, next) => {
            try{
                const email = await Usuario.findOne( { where :  { email : req.body.email } } )
                if(email){
                    res.status(500).json({ 'error' : 'email registrado' })
                    next(error)    
                }else{
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                const user = await Usuario.create( req.body );
                res.status(200).json(user)
            }
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
                    next(error)// //res.send(error)
                // res.status(500)
            }
        },
         login : async (req, res, next) => {

            try {
                    const user = await Usuario.findOne( { where :  { email : req.body.email } } )
                    if(user){
                        // Evaluar contraseña
                        const contrasenhaValida = bcrypt.compareSync(req.body.password, user.password)
                    if (contrasenhaValida)
                    {
                        const token = servtoken.encode(user.id, user.rol)
    
                        res.status(200).send({
                            auth : true,
                            tokenReturn : token,
                            user : user
                        })    
                    }  else {
                        res.status(401).send({ auth: false , tokenReturn: null , reason:"Invalid Password!"});
                    }    
                } else {
                    res.status(404).send({ 'error' : 'Usuario no encontrado' })
                }    
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
                next(error)
            }
        },
        list  : async (req, res, next) => {

            try {
                const user = await Usuario.findAll();
                res.status(200).json(user)
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
                next(error)
            }

        },
        update  : async (req, res, next) => {

            try {
                //Encontrando usuario
                const userbeta = await Usuario.findOne( { where :  { email : req.body.email } } );
                
                //validando clave
                const valida = bcrypt.compareSync(req.body.password, userbeta.password)
                if(valida)
                {
                    
                const newpassword = bcrypt.hashSync(req.body.newpassword, 10);
                const user = await Usuario.update( {nombre: req.body.nombre, estado: req.body.estado, password: newpassword},{ where: {email : req.body.email} });
                res.status(200).json(user)
                }else{

                }
                
            } catch (error) {
                res.status(500).json({ 'error' : 'Oops paso algo' })
            next(error)
            }
            
        }
       
        
}

