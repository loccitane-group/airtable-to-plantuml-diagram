const fs = require('fs');

class FileWriter {
    constructor(fileName) {
        this.fileName = fileName;
    }

    write (input) {
        fs.writeFile(this.fileName, input, (err) => {
            if(err) {
                return console.log(err);
            }

            console.log(`PlantUML diagram written to ${this.fileName}`);
        }); 
    }
}

module.exports = {
    FileWriter: FileWriter
}
