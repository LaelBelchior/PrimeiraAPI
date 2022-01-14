const db = require('../database/db')
const moment = require('moment')

class Pedido{
    adiciona(pedido, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(pedido.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValidacao = moment(data).isSameOrAfter(dataCriacao)
        const nomeValido = pedido.cliente.length >= 4

        const validacoes = [
            {
                nome:'data',
                valido: dataValidacao,
                mensagem:'Data de atendimento deve ser maior que data de criação.'
            },
            {
                nome:'cliente',
                valido: nomeValido,
                mensagem:'Cliente deve ter no mínimo quatro caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const errosExistentes = erros.length

        if(errosExistentes){
            res.status(400).json(errosExistentes)
        } else {
            const pedidoDatado = {...pedido, dataCriacao, data}
            const sql = 'INSERT INTO Pedidos SET ?'

            db.query(sql, pedidoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Pedidos'

        db.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Pedidos WHERE id = ${id}`

        db.query(sql, (erro, resultados) => {
            const pedidoUnico = resultados[0]
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(pedidoUnico)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Pedidos SET ? WHERE id=?'
    
        db.query(sql, [valores, id], (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })    
    }

    deleta(id, res){
        const sql = 'DELETE FROM Pedidos WHERE id=?'

        db.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Pedido