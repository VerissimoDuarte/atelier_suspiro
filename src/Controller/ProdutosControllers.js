const Produto = require('./../Models/Produtos')
const path = require('path')
const fs = require('fs')

module.exports = {
    create: async (req, res) => {
        let msg = ''
        if (req.method === 'GET'){
            const produto = req.body
            return res.render('CadastraProdutos', { produto, msg })
        }
        else if(req.method === 'POST'){
                                            
            if(req.body.name){
                if(req.body.id){
                    const produto = await Produto.findByPk(req.body.id)
                    await produto.update({ ...req.body, img: `${req.file?'image/'+req.file.filename:produto.img}` })
                    return res.render('/produtos/list')
                }
                else{
                    delete req.body.id
                    req.body.img = `image/${req.file?req.file.filename:'image/teste1.jpeg'}`
                    await Produto.create({ ...req.body })
                    msg = '* Cadastro Realizado Com Sucesso!'
                }
            }
            else{
                msg = '* Campo Nome Obrigatório'
            }

            const produto = ''
            return res.render('CadastraProdutos', { produto, msg })
        }
            
    
        
        
    },
    read: async (_, res) => {
        const produtos = await Produto.findAll()
        return res.render('ListaProdutos', { produtos })
    },
    update: async (req, res) => {
        
        if(req.method === 'GET'){
            const produto = await Produto.findByPk(req.params['id'])
            res.render('CadastraProdutos', { produto, msg:'' })
        }
        
    },
    delete: async (req, res) => {
        const produto = await Produto.findByPk(req.params['id'])
        fs.unlink(path.resolve(__dirname ,`../Views/static/${produto.img}`), (error) => console.log(error))
        await produto.destroy()
        res.redirect('/produtos/list')
        
    },
    index: async (_, res) => {
        //const produtos = await Produto.findAll()
        return res.render('index', { produtos: await Produto.findAll() })
    }
}