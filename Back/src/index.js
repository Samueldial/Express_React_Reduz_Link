"use strict";
exports.__esModule = true;
var express_1 = require("express");
var chalk_1 = require("chalk");
var app = express_1["default"]();
app.get('/', function (req, res) {
    console.log(chalk_1["default"].blue.bold("passei por aqui"));
    res.send('Olá mundo');
});
app.get('/about', function (req, res) {
    res.send('<h1>About</h1>');
});
app.get('/help', function (req, res) {
    res.send([
        {
            nome: 'spyke',
            raca: 'pudo'
        },
        {
            nome: 'doug',
            raca: 'vira'
        }
    ]);
});
app.get('/ola/:nome', function (req, res) {
    res.send("deu certo, " + req.params.nome);
});
app.get('/ola', function (req, res) {
    res.send("deu certo " + req.query.nome);
    console.log(req.query);
});
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});
