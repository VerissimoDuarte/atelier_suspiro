const Usuario = require('./../Models/Usuarios')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = {
    create: async (req, res) => {
        let msg = ''
        if(req.method === 'GET'){
            
            res.render('CadastraUsuario', {usuario: { ...req.body } , msg})
        }
        else if(req.method === 'POST'){
            
            if(!req.body.id){
                try{
                    delete req.body.id
                    req.body.password = await bcrypt.hashSync(req.body.password, 3)
                    await Usuario.create({ ...req.body })
                    res.redirect('/usuario/list')
                }
                catch (error){
                    msg = '* Error na gravação dos Dados, Verifique os campos!'
                }
                
            }
            else{
                const usuario = await Usuario.findByPk(req.body.id)
                if(req.body.password === req.body.newPassword){
                    delete req.body.newPassword
                    await usuario.update({ ...req.body  })
                    res.redirect('/usuario/list')
                }
                else{
                    msg = '* Senhas incompativeis'
                }
            }

            res.render('CadastraUsuario', {usuario: { ...req.body } , msg})
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
        const firstUser = async () =>{
            const user = await Usuario.findAll()
            if(user.length === 0){
                await Usuario.create({
                    name: 'admin',
                    password: bcrypt.hashSync('123456', 3),
                    email: 'jrduartesilva@gmail.com'
                })
            }
        }
        if(req.method === 'GET'){
            firstUser()
            return res.render('Login')
        }
        else if (req.method === 'POST'){
            console.log(req.body)
        }
    },
    auth: (passport) => {
    
        async function findUser(username){
            const usuario = await Usuario.findOne({where: {name: username}})
            return usuario
        }
        async function findUserById(id){
            const usuario = await Usuario.findByPk(id)
            return usuario
        }
    
        passport.serializeUser((user, done) => {
            done(null, user.id)
        })
    
        passport.deserializeUser((id, done) => {
            try {
                const user = findUserById(id)
                done(null, user)
            } 
            catch (error) {
                done(error, null)
            }
        })
    
        passport.use(new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        (name, password, done) => {
            try {
                findUser(name).then((user)=>{
                    if(!user) return done(null, false)
                    const isValid = bcrypt.compareSync(password, user.password)
                    if(!isValid) return done(null, false)
        
                    return done(null, user)
                })
                
                
            } 
            catch (error) {
                done(error, false)    
            }
            
        }))
    
    
    },
    middlewareAuth: (req, res, next) => {
        if(req.isAuthenticated()) return next()
        res.redirect('/login')
    }
}