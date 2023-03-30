const Produto = require('./../Models/Produtos')
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
                    const produtos = await Produto.findAll()
                    return res.render('ListaProdutos', { produtos })
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
        
        await Produto.destroy({where: {id: req.params['id']}})
        const produtos = await Produto.findAll()
        res.render('ListaProdutos', { produtos })
        
    },
    index: async (_, res) => {
        const produtos = await Produto.findAll()
        console.log(produtos)
        res.render('index', { produtos })
    }
}