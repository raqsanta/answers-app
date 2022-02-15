const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {

    res.render('home')

})

app.post('/salvarpergunta', (req,res) => {

    let titulo = req.body.titulo
    let descricao = req.body.descricao

    res.send('pergunta enviada com sucesso!!!'+titulo+' - '+descricao)

})

app.listen(3000, () => {

    console.log('servidor rodando')

})