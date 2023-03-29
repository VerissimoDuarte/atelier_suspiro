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


//Rotas

//Rotas Produto

app.get('/produto', ProdutosControllers.create)
app.post('/produto', upload.single('img'), ProdutosControllers.create)
app.get('/produtos/list', ProdutosControllers.read)
app.get('/', ProdutosControllers.index)
app.get('/produto/e/:id', ProdutosControllers.delete)
app.get('/produto/u/:id', ProdutosControllers.update)

//Rotas Usuarios

app.get('/usuario/list', UsuariosControllers.read)
app.get('/usuario', UsuariosControllers.create)
app.post('/usuario', UsuariosControllers.create)
app.get('/usuario/d/:id', UsuariosControllers.delete)
app.get('/usuario/u/:id', UsuariosControllers.update)
app.get('/login', UsuariosControllers.login)
app.post('/login', UsuariosControllers.login)

//Rotas Mensagem

app.get('/mensagem/list', MensagensControllers.read)
app.get('/mensagem/:id', MensagensControllers.read)
app.get('/mensagem/d/:id', MensagensControllers.delete)
app.get('/mensagem', MensagensControllers.create)
app.post('/mensagem', MensagensControllers.create)

//Rotas Contato

app.get('/contato', ContatoControllers.update)
app.post('/contato', ContatoControllers.update)

//Rotas App

app.get('/app', (req, res)=>{
    return res.render('app')
})

//Executando o serviço
app.listen(port, () =>{
    console.log('Executando em http://localhost:8080')
})