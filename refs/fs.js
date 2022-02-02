const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const base = path.resolve(__dirname, "temp");

const getContent = () => `\n${process.argv[2] ?? ""}`;

async function createFolder() {
  try {
    if (!fsSync.existsSync(base)) {
      await fs.mkdir(base);
      console.log("folder created");
    }
    fs.appendFile(path.join(base, "logs.text"), getContent());
    const data = await fs.readFile(path.join(base, "logs.text"), {
      encoding: "utf-8"
    });
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
}

createFolder();
