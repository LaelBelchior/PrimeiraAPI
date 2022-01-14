const db = require('mysql')

const conexao = db.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'LaelBelchior12345!',
    database: 'Pedidos',
})

module.exports = conexao