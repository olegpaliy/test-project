const fs = require("fs").promises;
class FileRepository {
  constructor(fileName) {
    this.fileName = fileName;
  }
  read() {
    return fs.readFile(this.fileName, "utf8").then(JSON.parse);
  }
  update(data) {
    return fs.writeFile(this.fileName, JSON.stringify(data));
  }
}

module.exports = FileRepository;
