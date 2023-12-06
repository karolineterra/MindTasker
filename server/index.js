const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = "admin123root321";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ghssh64.g',
  database: 'mindtasker',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection successful!');
  }
});

app.post("/api/createAccount", (req, res) => {
  const { name, email, password, birth, gender } = req.body;

  const sql = `
    INSERT INTO usuario (nome, email, senha, nascimento, genero, cor_preferida)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [name, email, password, birth, gender, '#AA90D4'], (err, result) => {
    if (err) {
      console.error('Error creating account:', err);
      res.status(500).json({ error: 'Error creating account' });
    } else {
      console.log('Account created successfully!');
      res.json({ message: 'Account created successfully!' });
    }
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM usuario
    WHERE email = ? AND senha = ?
  `;

  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Error during login' });
    } else {
      if (results.length > 0) {
        const userId = results[0].id;
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token }); 
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;

      const sql = `
        SELECT nome, foto, email, nascimento, genero FROM usuario
        WHERE id = ?
      `;

      connection.query(sql, [userId], (err, results) => {
        if (err) {
          console.error("Error fetching user data:", err);
          res.status(500).json({ error: "Error fetching user data" });
        } else {
          if (results.length > 0) {
            const userData = {
              nome: results[0].nome,
              foto: results[0].foto,
              email: results[0].email,
              nascimento: results[0].nascimento,
              genero: results[0].genero,
            };
            res.json(userData);
          } else {
            res.status(404).json({ error: "User not found" });
          }
        }
      });
    }
  });
});

app.post("/api/updateProfile", (req, res) => {
  const { userId, nome, email, nascimento, genero, foto } = req.body;

  const sql = `
    UPDATE usuario
    SET nome = ?, email = ?, nascimento = ?, genero = ?, foto = ?
    WHERE id = ?
  `;

  connection.query(sql, [nome, email, nascimento, genero, foto, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Error updating profile' });
    } else {
      console.log('Profile updated successfully!');
      res.json({ message: 'Profile updated successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});