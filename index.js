const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const res = require('express/lib/response')

connection.authenticate().then(()=>{
    console.log('funcionou o bd')
}).catch(()=>{
    console.log('não funcionou o bd :(')
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {

    res.render('home')

})

app.get('/perguntas', (req,res)=>{

    Pergunta.findAll({raw: true}).then((perguntas)=>{

        res.render('perguntas', {
            perguntas: perguntas
        })

    })

})

app.post('/salvarpergunta', (req,res) => {

    let titulo = req.body.titulo
    let descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/')
    }).catch(()=>{
        res.send('ocorreu algum erro, desculpa!')
    })

})

app.listen(3000, () => {

    console.log('servidor rodando')

})