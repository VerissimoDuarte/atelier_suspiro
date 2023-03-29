const Mensagem = require('./../Models/Mensagens')
module.exports = {
    create: async (req, res)=> {
        let msg = ''
        if(req.method === 'POST'){
            if(req.body.name && req.body.email && req.body.telefone && req.body.mensagem){
                try{
                    
                    await Mensagem.create( {...req.body } )
                    msg = "* Mensagem Enviada Com Sucesso"
                }
                catch (error){
                    msg = `* Erro: ${error}`
                    
                }
            }
            else{
                msg = "* Atenção aos camopos obrigatorios! "
            }
            
        }
        
        return res.render('CadastraMensagem', { msg })
    },
    read: async (req, res) => {
        if(req.method === 'GET'){
            if(!req.params['id']){
                const mensagens = await Mensagem.findAll()
                return res.render('ListaMsg', { mensagens })
            }
            else{
                const mensagens = await Mensagem.findByPk(req.params['id']) 
                return res.render('Mensagem', { mensagens })

            }
        }
        else if(req.method === 'POST'){
            return res.render('Mensagem')
        }
    },
    delete:async (req, res) => {
        if(req.method === 'GET'){
            if(req.params['id']){
                const mensagens = await Mensagem.findByPk(req.params['id'])
                await mensagens.destroy()
            }
            
            const mensagens = await Mensagem.findAll()
            return res.redirect('/mensagem/list')
        }

    }
}