const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Tudo certo, nada errado!")
})

app.get('/pedidos', (req, res) => {
    res.send('Página de pedidos!')
})