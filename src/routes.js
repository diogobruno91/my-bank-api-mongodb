const express = require('express')
const Account = require('./models/Account')
const { find } = require('./models/Account')
const { json } = require('express')

const route = express.Router()

route.post('/', async (req, res)  => {
    try {
        const account =  await Account.create(req.body)

        return res.json(account)
    } catch (error) {
        console.log(`Erro na requisição ${error}`);
    }
})

route.get('/', async (req, res) => {
    try {
        const account = await Account.find({})

        return res.json(account)
    } catch (error) {
        console.log(`Erro na requisição ${error}`);
    }
})

// Questao 4.
route.put('/:agencia/:conta', async (req, res) => {
    try {
        const agencia = req.params.agencia
        const conta = req.params.conta
        const account = await Account.findOneAndUpdate({agencia: agencia, conta: conta}, req.body, {new: true})

        return res.json(account)

    } catch (error) {
        console.log(`Erro na requisição ${error}`);        
    }
})

//Questão 5 
route.post('/:agencia/:conta/:balance', async (req, res) => {
    try {
        const agencia = req.params.agencia
        const conta = req.params.conta
        const saque = Number(req.params.balance)
        const saqueTotal = saque + 1
        const account = await Account.findOneAndUpdate({agencia: agencia, conta: conta, balance: {$gt: saque}},
                                                       {$inc:{balance: - saqueTotal}},
                                                       {new: true}
                                                       )

        return res.json(account)

    } catch (error) {
        console.log(`Erro na requisição ${error}`);
    }
})

// Questão 6.
route.get('/:agencia/:conta', async (req, res) => {
    try {
        const agencia = req.params.agencia
        const conta = req.params.conta

        const account = await Account.find({agencia: agencia, conta: conta}, {balance: 1, _id: 0})

        return res.json(account)
    } catch (error) {
        console.log(`Erro na requisição ${error}`);
    }
})

// Questão 7.
route.delete('/:agencia/:conta', async (req, res) => {
    try {
        const agencia = req.params.agencia
        const conta = req.params.conta

        const account = await Account.deleteMany({agencia: agencia, conta: conta })
        if(!account) {
            return res.status(404).send("Não encontrado")
        }

        const result = await Account.find({agencia: agencia})

        return res.send(result)

    } catch (error) {
        console.log(`Erro na requisição ${error}`);        
    }
})

//Questão 8.
route.post('/transfer', async (req, res) => {
    try {
        const { contaOri, contaDes, valor } = req.body

        if(!contaOri || !contaDes || !valor) {
            return res.status(400).send('Erro na requisição, preencher os valores')            
        }
        console.log(contaOri);
        console.log(contaDes);

        const findContaOri = await Account.findOne({ conta: contaOri })
        const findContaDes = await Account.findOne({ conta: contaDes })
        
        if(findContaOri !== findContaDes.agencia) {
            findContaDes.balance -= 8;
        }
        
        findContaOri.balance -= valor
        findContaDes.balance += valor
        
        await findContaOri.save();
        await findContaDes.save();        
        
        return res.status(200).json(findContaOri)

    } catch (error) {
        console.log('Error:' + error);
    }
})


module.exports = route;



