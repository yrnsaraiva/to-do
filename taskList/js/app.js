const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro', 'root', '', {
    host: "Localhost",
    dialect: 'mysql'
})

/*
sequelize.authenticate().then(function (){
    console.log("host reachable!")
}).catch(function (erro){
    console.log("host not reachable: "+erro)
})
 */