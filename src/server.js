const express = require("express")
const server  = express()
const routes  = require("./routes")
const path    = require("path")

// usando template engine
server.set("view engine", "ejs")

// EJS uses __dirname + "/views"  as basePath
// mudar local da pasta views
server.set("views", path.join(__dirname, "views"))

// Habilitar arquivos estaticos, criar todas as rotas da pasta public
server.use(express.static("public"))

// enable req.body Post arguments
server.use(express.urlencoded({ extended: true}))

server.use(routes)

server.listen(3000, () => "Running!")