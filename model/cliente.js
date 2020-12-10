//importação do mongoose para realizar a persistência com mongodb
const mongoose = require("mongoose");
// importação do módulo bcrypt para encriptografar senhas 
const bcrypt = require('bcryptjs');
//Criação do esquema de dados da tabela. Campos da tabela
const tabela = new mongoose.Schema({
    nome:{type:String, required:true},
    email:{type:String,required:true},
    cpf:{type:String,required:true},
    telefone:String,
    idade:{type:Number,min:16, max:120},
    usuario:{type:String, unique:true},
    senha:String,
    datacadastro:{type:Date, default: Date.now}
})
//Criação de uma função para encriptografar a senha
tabela.pre('save',function(next){
    let cliente = this
    if(!cliente.isModified('senha')) return next()
    bcrypt.hash(cliente.senha,10,(err,encr)=>{
        cliente.senha = encr
        return next()
    })
})
//construção de tabela com o comando model
module.exports = mongoose.model('tbcliente',tabela);