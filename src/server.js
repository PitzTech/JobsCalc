const express = require("express")
const server = express()
const routes = require("./routes")

// usando template engine
server.set("view engine", "ejs")

// Habilitar arquivos estaticos, criar todas as rotas da pasta public
server.use(express.static("public"))

// enable req.body Post arguments
server.use(express.urlencoded({ extended: true}))

server.use(routes)

server.listen(3000, () => "Running!")