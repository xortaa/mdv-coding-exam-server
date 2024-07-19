import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mysql, { PoolConnection } from "mysql";
import cors from "cors";

const app: express.Application = express();
const port: number = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

interface Task {
  id?: number;
  title: string;
  completed: boolean;
}

const pool: mysql.Pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "mdv_coding_exam",
});

app.get("/", (req: Request, res: Response) => {
  pool.getConnection((err: mysql.MysqlError, connection: PoolConnection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from tasks", (err: mysql.MysqlError, rows: Task[]) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      console.log("The tasks from tasks table are: \n", rows);
    });
  });
});

app.post("/", (req: Request, res: Response) => {
  pool.getConnection((err: mysql.MysqlError, connection: PoolConnection) => {
    if (err) throw err;

    const params: Task = req.body;
    connection.query("INSERT INTO tasks SET ?", params, (err: mysql.MysqlError, rows) => {
      connection.release();
      if (!err) {
        res.send(`Task with the record ID has been added.`);
      } else {
        console.log(err);
      }

      console.log("The data from task table are:11 \n", rows);
    });
  });
});

app.delete("/:id/delete", (req: Request, res: Response) => {
  pool.getConnection((err: mysql.MysqlError, connection: PoolConnection) => {
    if (err) throw err;
    connection.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err: mysql.MysqlError, rows) => {
      connection.release();
      if (!err) {
        res.send(`Task with the record ID ${[req.params.id]} has been removed.`);
      } else {
        console.log(err);
      }

      console.log("The data from task table are: \n", rows);
    });
  });
});

app.put("/:id/toggle-complete", (req: Request, res: Response) => {
  pool.getConnection((err: mysql.MysqlError, connection: PoolConnection) => {
    if (err) throw err;
    const { id } = req.params;
    const query = "UPDATE tasks SET completed = NOT completed WHERE id = ?";

    connection.query(query, [id], (err: mysql.MysqlError, result: mysql.OkPacket) => {
      connection.release();

      if (!err) {
        if (result.affectedRows === 0) {
          res.status(404).send(`Task with ID ${id} not found.`);
        } else {
          res.send(`Task with ID ${id} has been updated.`);
        }
      } else {
        console.error(err);
        res.status(500).send("Failed to update the task.");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
