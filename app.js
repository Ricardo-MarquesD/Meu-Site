const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'database',
  port: 3306
});

db.connect((err) => {
  if (err) console.log(`Não foi possivel conctar com o banco de dados: ${err}`);
  console.log('Conectado ao banco de dados da BlackNotes!');
});

app.post('/signin', (req, res) => {
    const { nome, email, password } = req.body;
  
    const sql = 'INSERT INTO user (nomeUsu, emailUsu, passwordUsu) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, password], (err, result) => {
      if (err) {
        console.err;
        res.status(409).send(`Falha ao cadastrar: ${err}`);
      }
      res.send('Usuário cadastrado com sucesso!');
    });
  });

  app.post('/login', (req, res) => {
  
    const { email, password } = req.body;
  
    const sql = 'SELECT * FROM user WHERE emailUse = ? AND passowrdUse = ?';
    db.query(sql, [email, password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send('Login bem-sucedido!');
      } else {
        res.status(401).send('Credenciais inválidas!');
      }
    });
  });

  app.post('/notes', (req,res) => {
    const { title, description } = req.body;

    const sql = 'INSERT INTO note ( titleNot, descriptionNot ) VALUES (?, ?)';
    db.query(sql, [title, description], (err, result) => {
        if(err){
            console.err;
            res.status(409).send(`Erro desconhecido: ${err}`);
        }
        res.send('Nota criada!');
    });
  });

  app.post('/visualNote', (req, res) => {
    const { title, description } = req.body;

    const sql = 'SELECT * FROM note WHERE titleNot = ? AND descriptionNot = ?';
    db.query(sql, [ title, description], (err, result) => {
    });
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });