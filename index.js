const customExpress = require('./config/customExpress')
const database = require('./database/db')
const tabela = require('./database/tabelas')

database.connect(erro => {
    if(erro){
        console.log('Deu ruim, meu chefe.')
    } else {
        console.log('Tudo tranquilo!')

        tabela.iniciar(database)
        
        const app = customExpress()

        app.listen(3000, () => {
            console.log("Servidor rodando!")
        })
    }
})
