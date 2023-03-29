const Usuario = require('./../Models/Usuarios')
module.exports = {
    create: async (req, res) => {
        let msg = ''
        if(req.method === 'GET'){
            
            res.render('CadastraUsuario', {usuario: { ...req.body } , msg})
        }
        else if(req.method === 'POST'){
            if(!req.body.id){
                try{
                    await Usuario.create({ ...req.body })
                    res.redirect('/usuario/list')
                }
                catch (error){
                    msg = '* Error na gravação dos Dados, Verifique os campos!'
                }
                
            }
            else{
                const usuario = await Usuario.findByPk(req.body.id)
                delete req.body.newPassword
                await usuario.update({ ...req.body  })
                res.redirect('/usuario/list')
            }
        }
    },
    read: async (req, res) => {
        if(req.method === 'GET'){
            const usuarios = await Usuario.findAll()
            return res.render('ListaUsuarios', { usuarios })
        }
    },
    update: async (req, res) => {
        
        if(req.method === 'GET'){
            const usuario = await Usuario.findByPk(req.params['id'])
            res.render('CadastraUsuario', { usuario, msg:'' })
        }
        
    },
    delete: async (req, res) => {
        if(req.method === 'GET'){
            if(req.params['id']){
                const usuario = await Usuario.findByPk(req.params['id'])
                await usuario.destroy()
            }
            
            return res.redirect('/usuario/list')
        }

    },
    login: (req, res) => {
        if(req.method === 'GET'){
            return res.render('Login')
        }
        else if (req.method === 'POST'){
            console.log(req.body)
        }
    }
}