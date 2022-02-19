const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
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

    Pergunta.findAll({raw: true, order: [
        ['id','desc']
    ]}).then((perguntas)=>{

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

app.get('/pergunta/:id', (req,res)=>{
    var id = req.params.id
    Pergunta.findOne({where: {id: id}}).then((pergunta)=>{
        if(pergunta != undefined){

            Resposta.findAll({where: {perguntaId: id}}).then((respostas)=>{
                res.render('pergunta', {pergunta: pergunta, respostas: respostas})
            })

        }else{
            res.redirect('/')
        }
    })
})

app.post('/salvarresposta/:id', (req,res)=>{

    let id = req.params.id
    let resposta = req.body.resposta

    Resposta.create({
        corpo: resposta,
        perguntaId: id
    }).then(()=>{
        res.redirect('/pergunta/'+id)
    }).catch(()=>{
        res.send('ocorreu algum erro, desculpa!')
    })

})

app.listen(3000, () => {

    console.log('servidor rodando')

})