class Tabela {
    iniciar(conexao){
        this.conexao = conexao
        this.criarPedido()
    }

    criarPedido(){
        const sql = 'CREATE TABLE IF NOT EXISTS Pedidos (id int NOT NULL AUTO_INCREMENT, cliente varchar(30) NOT NULL, combo varchar(30) NOT NULL, endereco varchar(50) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY (id))'
        
        this.conexao.query(sql, erro => {
            if(erro){
                console.log('DEU ERRO, MEU CHAPA!!!')
            } else {
                console.log('Tabela criada com sucesso.')
            }
        })
    }
}

module.exports = new Tabela