const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = "admin123root321";

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MindtaskerAdmin1234",
  database: "mindtasker",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connection successful!");
  }
});

app.post("/api/createAccount", (req, res) => {
  const { name, email, password, birth, gender } = req.body;

  const sql = `
    INSERT INTO usuario (nome, email, senha, nascimento, genero, cor_preferida)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [name, email, password, birth, gender, "#AA90D4"],
    (err, result) => {
      if (err) {
        console.error("Error creating account:", err);
        res.status(500).json({ error: "Error creating account" });
      } else {
        console.log("Account created successfully!");
        res.json({ message: "Account created successfully!" });
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM usuario
    WHERE email = ? AND senha = ?
  `;

  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ error: "Error during login" });
    } else {
      if (results.length > 0) {
        const userId = results[0].id;

        const kanbanIdQuery = `
          SELECT id, workspace_id FROM kanban
          WHERE usuario_id = ?
        `;
        let kanbanId;
        connection.query(
          kanbanIdQuery,
          [userId],
          (kanbanErr, kanbanResults) => {
            if (kanbanErr) {
              console.error("Error fetching kanbanId:", kanbanErr);
              res.status(500).json({ error: "Error during login" });
            } else {
              if (kanbanResults.length > 0) {
                kanbanIds = kanbanResults;
              } else {
                kanbanId = null;
              }

              const token = jwt.sign({ userId, kanbanId }, SECRET_KEY, {
                expiresIn: "1h",
              });
              res.json({ message: "Login successful", token });
            }
          }
        );
      } else {
        res.status(401).json({ error: "Invalid credentials" });
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
        SELECT nome, foto, email, DATE_FORMAT(nascimento, '%Y-%m-%d') as nascimento, genero, cor_preferida FROM usuario
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
              cor_preferida: results[0].cor_preferida,
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

/*Criando nova rota para obter workspaces do usuario*/
app.get("/api/workspaces", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;

      const sql = `
        SELECT id, nome FROM workspace
        WHERE usuario_id = ?
      `;

      connection.query(sql, [userId], (err, results) => {
        if (err) {
          console.error("Error fetching user workspaces:", err);
          res.status(500).json({ error: "Error fetching user workspaces" });
        } else {
          res.json(results);
        }
      });
    }
  });
});

/*Criando rota para adicionar novo workspace*/

app.post("/api/addWorkspace", (req, res) => {
  const { nome } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  console.log("Token recebido: ", token);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;
      console.log("userId extraído do token", userId);

      const sql = `
        INSERT INTO workspace (nome, usuario_id)
        VALUES (?, ?)
      `;

      connection.query(sql, [nome, userId], (err, result) => {
        if (err) {
          console.error("Error adding workspace:", err);
          res.status(500).json({ error: "Error adding workspace" });
        } else {
          res.json({ message: "Workspace added successfully!" });
        }
      });
    }
  });
});

// rota para deletar espaço
app.delete("/api/deleteWorkspace/:spaceId", (req, res) => {
  const { spaceId } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;

      const sql = `
        DELETE FROM workspace
        WHERE id = ? AND usuario_id = ?
      `;

      connection.query(sql, [spaceId, userId], (err, result) => {
        if (err) {
          console.error("Error deleting workspace:", err);
          res.status(500).json({ error: "Error deleting workspace" });
        } else {
          res.json({ message: "Workspace deleted successfully!" });
        }
      });
    }
  });
});

//Rota para renderizar os templates
app.get("/api/templates/:spaceId", (req, res) => {
  const { spaceId } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const sql = `
        SELECT 'kanban' as type, espaco FROM kanban WHERE workspace_id = ?
        UNION ALL
        SELECT 'pomodoro' as type, espaco FROM pomodoro WHERE workspace_id = ?
        UNION ALL
        SELECT 'todolist' as type, espaco FROM todolist WHERE workspace_id = ?
        UNION ALL
        SELECT 'notas' as type, espaco FROM notas WHERE workspace_id = ?
      `;

      connection.query(
        sql,
        [spaceId, spaceId, spaceId, spaceId],
        (err, results) => {
          if (err) {
            console.error("Error fetching templates:", err);
            res.status(500).json({ error: "Error fetching templates" });
          } else {
            console.log(results);
            res.json(results);
          }
        }
      );
    }
  });
});

//rota para salvar templates selecionados
app.post("/api/addTemplate/:spaceId", (req, res) => {
  const { spaceId } = req.params;
  const { type, espaco } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;

      let insertSql;
      let values;

      switch (type) {
        case "kanban":
          insertSql =
            "INSERT INTO kanban (espaco, workspace_id, usuario_id) VALUES (?, ?, ?)";
          values = [espaco, spaceId, userId];
          break;
        case "pomodoro":
          insertSql =
            "INSERT INTO pomodoro (espaco, workspace_id) VALUES (?, ?)";
          values = [espaco, spaceId];
          break;
        case "todolist":
          insertSql =
            "INSERT INTO todolist (espaco, workspace_id) VALUES (?, ?)";
          values = [espaco, spaceId];
          break;
        case "notas":
          insertSql =
            "INSERT INTO notas (espaco, workspace_id, nome, conteudo) VALUES (?, ?, ?, ?)";
          values = [espaco, spaceId, "texto aqui", "texto aqui"];
          break;
        default:
          res.status(400).json({ error: "Invalid template type" });
          return;
      }

      connection.query(insertSql, values, (err, result) => {
        if (err) {
          console.error(`Error adding ${type} template:`, err);
          res.status(500).json({ error: `Error adding ${type} template` });
        } else {
          res.json({ message: `${type} template added successfully!` });
        }
      });
    }
  });
});

//rota para editar informações do perfil
app.post("/api/updateProfile", (req, res) => {
  const { nome, email, nascimento, genero, foto } = req.body;

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;

      const sql = `
        UPDATE usuario
        SET nome = ?, email = ?, nascimento = ?, genero = ?, foto = ?
        WHERE id = ?
      `;

      connection.query(
        sql,
        [nome, email, nascimento, genero, foto, userId],
        (err, result) => {
          if (err) {
            console.error("Error updating profile:", err);
            res.status(500).json({ error: "Error updating profile" });
          } else {
            console.log("Profile updated successfully!");
            res.json({ message: "Profile updated successfully!" });
          }
        }
      );
    }
  });
});

//rota mudar cor preferida
app.post("/api/changecolor", (req, res) => {
  const { color } = req.body;

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.userId;

      const sql = `
        UPDATE usuario
        SET cor_preferida = ?
        WHERE id = ?
      `;

      connection.query(sql, [color, userId], (err, result) => {
        if (err) {
          console.error("Error changing color:", err);
          res.status(500).json({ error: "Error changing color" });
        } else {
          console.log("Color changed successfully!");
          res.json({ message: "Color changed successfully!" });
        }
      });
    }
  });
});

//rota para pegar tarefas do kanban
app.get("/api/tasks", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.error("Token not found");
    res.status(401).json({ error: "Token not found" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      const kanbanId = decoded.kanbanId;

      if (!kanbanId) {
        console.error("Kanban ID not found in decoded token");
        console.log(decoded.userId);
        res.status(401).json({ error: "Kanban ID not found in token" });
        return;
      }

      const sql = `
        SELECT id, nome, estado, background_color FROM tarefakanban
        WHERE kanban_id = ?
      `;

      connection.query(sql, [kanbanId], (err, results) => {
        if (err) {
          console.error("Error fetching tasks:", err);
          res.status(500).json({ error: "Error fetching tasks" });
        } else {
          console.log("Tasks fetched successfully:", results);
          res.json(results);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});