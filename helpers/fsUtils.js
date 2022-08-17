const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, note) =>
    fs.writeFile(destination, JSON.stringify(note, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (note, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(note);
            writeToFile(file, parsedData);
        }
    });
};

// const readAndRemove = (file) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const parsedData = JSON.parse(data);
//             for (i = 0; i < parsedData.length; i++) {
//                 if (parsedData[i] === parsedData.id) {
//                     delete parsedData.id;
//                     writeToFile(file, parsedData);
//                 }
//             }
//         }
//     });
// };

module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };