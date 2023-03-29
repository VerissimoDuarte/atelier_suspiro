const Contato = require('./../Models/Contatos')
module.exports = {
    update: async (req, res) => {
        let msg = ""
        if(req.method === 'GET'){
            const contato = await Contato.findByPk(1) || { ...req.body }
            return res.render('Contato', { contato, msg: msg })
        }
        else if(req.method === 'POST'){
            try{
                const contato = await Contato.findByPk(1)
                if(contato){
                    await contato.update({ ...req.body })
                }
                else{
                    Contato.create({ ...req.body })
                }
                msg = "* Dados Salvos com Sucesso."
            }
            catch (error){
                msg = "* Erro na gravação dos Dados."
            }  
            
            return res.render('Contato', { contato: { ...req.body }, msg: msg })
        }
    }    
}