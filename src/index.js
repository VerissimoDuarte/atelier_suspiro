//modulos basicos
const express = require('express')
const path = require('path')

//Controladores
const ContatoControllers = require('./Controller/ContatoControllers')
const MensagensControllers = require('./Controller/MensagensControllers')
const ProdutosControllers = require('./Controller/ProdutosControllers')
const UsuariosControllers = require('./Controller/UsuariosControllers') 

//Middleware

const storage = require('./multerConfig')
const multer = require('multer')
const upload = multer({ storage })

//Configurações do serviço
const port = 8080
const app = express()

app.set('view engine', 'ejs')
app.set('views', [
    path.resolve(__dirname, 'Views/template'),
    path.resolve(__dirname, 'Views/template/Produtos'),
    path.resolve(__dirname, 'Views/template/Mensagens'),
    path.resolve(__dirname, 'Views/template/Contato'),
    path.resolve(__dirname, 'Views/template/Usuarios')
])

app.use(express.urlencoded())
app.use(express.static(path.resolve(__dirname, 'Views/static')))
app.use(express.static(path.resolve(__dirname, '../node_modules/@fortawesome/fontawesome-free')))

// Configuração do login
const passport = require('passport')
const session = require('express-session')

UsuariosControllers.auth(passport)
app.use(session({
    secret: 'fuhbviyvcouhwedcuQDBHUWDHBX@cnejqjwcebfh',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30*60*1000}
}))

app.use(passport.initialize())
app.use(passport.session())

//Rotas

//Rotas Produto

app.get('/produto', UsuariosControllers.middlewareAuth, ProdutosControllers.create)
app.post('/produto',UsuariosControllers.middlewareAuth, upload.single('img'), ProdutosControllers.create)
app.get('/produtos/list',UsuariosControllers.middlewareAuth, ProdutosControllers.read)
app.get('/', ProdutosControllers.index)
app.get('/produto/e/:id',UsuariosControllers.middlewareAuth, ProdutosControllers.delete)
app.get('/produto/u/:id',UsuariosControllers.middlewareAuth, ProdutosControllers.update)

//Rotas Usuarios

app.get('/usuario/list', UsuariosControllers.middlewareAuth, UsuariosControllers.read)
app.get('/usuario', UsuariosControllers.middlewareAuth, UsuariosControllers.create)
app.post('/usuario', UsuariosControllers.middlewareAuth, UsuariosControllers.create)
app.get('/usuario/d/:id', UsuariosControllers.middlewareAuth, UsuariosControllers.delete)
app.get('/usuario/u/:id', UsuariosControllers.middlewareAuth, UsuariosControllers.update)

//Rotas Mensagem

app.get('/mensagem/list', UsuariosControllers.middlewareAuth, MensagensControllers.read)
app.get('/mensagem/:id', UsuariosControllers.middlewareAuth, MensagensControllers.read)
app.get('/mensagem/d/:id', UsuariosControllers.middlewareAuth, MensagensControllers.delete)
app.get('/mensagem', UsuariosControllers.middlewareAuth, MensagensControllers.create)
app.post('/mensagem', UsuariosControllers.middlewareAuth, MensagensControllers.create)

//Rotas Contato

app.get('/contato', UsuariosControllers.middlewareAuth, ContatoControllers.update)
app.post('/contato', UsuariosControllers.middlewareAuth, ContatoControllers.update)

//Rotas de Login

app.get('/login', UsuariosControllers.login)
app.post('/login', passport.authenticate('local', {
    successRedirect: '/produtos/list',
    failureRedirect: '/login?fail=true'
}))

//Executando o serviço

app.listen(port, () =>{
    console.log('Executando em http://localhost:8080')
})