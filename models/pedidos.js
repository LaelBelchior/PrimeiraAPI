const db = require('../database/db')

class Pedido{
    adiciona(pedido){
        const sql = 'INSERT INTO Pedidos SET ?'

        db.query(sql, pedido, (erro, resultados) => {
            if(erro){
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Pedido