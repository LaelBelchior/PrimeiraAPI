const db = require('../database/db')
const moment = require('moment')
const { response } = require('express')

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
}

module.exports = new Pedido