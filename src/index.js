//configuração do servidor
const express = require('express')
const app = express()
const port = process.env.PORT || 3030

//ativar a renderização jso/ejs
app.use(express.json())
app.set('view engine', 'ejs')

//multer
const multer = require("multer")

//storage (local de desenvolvimento)
const storage = multer.diskStorage({
    //destino
    destination:(req,res,cb)=>{
        cb(null,'uploads')
    },
    //filename
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer ({storage})

//rota padrao.
app.get('/', (req,res)=>{
    res.render('index')
})

//post (recebimento via formulario)
//uso do multer (midleware)
app.post('/', upload.single('arquivo'), (req,res)=>{
    res.send("OK")
    //log (apoio a logica)
    console.log(req.body,req.file)
})

//escuta do servidor
app.listen(port,()=>{
    console.log(`Servidor escutando em http://localhost:${port}`)
})