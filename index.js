// const { addNote, printNotes, removeNote } = require("./notes.controller");
// const yargs = require("yargs");

// const pkg = require("./package.json");

// yargs.version(pkg.version);

// yargs.command({
//   command: "add",
//   describe: "Add new note to list",
//   builder: {
//     title: {
//       type: "string",
//       describe: "Note title",
//       demandOption: true
//     }
//   },
//   handler: ({ title }) => {
//     addNote(title);
//   }
// });

// yargs.command({
//   command: "remove",
//   describe: "Delete note by id",
//   builder: {
//     id: {
//       type: "string",
//       describe: "Note id",
//       demandOption: true
//     }
//   },
//   handler: async ({ id }) => {
//     removeNote(id);
//   }
// });

// yargs.command({
//   command: "list",
//   describe: "Print all notes",
//   handler: async () => {
//     printNotes();
//   }
// });

// yargs.parse();

// Создание сервера
const http = require("http");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNote,
  editNote
} = require("./notes.controller");
const express = require("express");
const basePath = path.resolve(__dirname, "pages");

const port = 3000;

// С помощью стандартного модуля http
// const server = http.createServer(async (req, res) => {
//   if (req.method === "GET") {
//     const content = await fs.readFile(path.resolve(basePath, "index.html"));
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(content);
//   } else if (req.method === "POST") {
//     const body = [];
//     req.on("data", data => {
//       body.push(Buffer.from(data).toString());
//     });
//     req.on("end", () => {
//       res.writeHead(200, { "Content-Type": "text/pline; charser=utf-8" });
//       const title = body
//         .toString()
//         .replace(/(title=)(.*)/, "$2")
//         .replace(/\+/g, " ");

//       addNote(title);
//       res.end(`Title=${title}`);
//     });
//   }
// });

// server.listen(port, () => {
//   console.log(chalk.green(`Server been started from port ${port}...`));
// });

// С помощью Express
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  // res.sendFile(path.resolve(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);

  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  });
});

app.put("/:id", async (req, res) => {
  editNote(req.body.title, req.body.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server been started from port ${port}...`));
});
