var fs = require('fs');
var path = require('path');
var pdfreader = require("pdfreader");
var dirPath = __dirname;
var pdf = require('pdf-parse');
var xlsx = require('node-xlsx');
var csv = require('node-csv').createParser('\t', '"', '\\');
const {
    extractText
} = require('doxtract');
//var csv = require('node-csv').createParser();
var textract = require('textract');
var testPdfReader = function (request, response) {
    var filePath = path.join(dirPath, "../UploadedScripts/sample.pdf");

    new pdfreader.PdfReader().parseFileItems(filePath, function (err, item) {
        if (item.text) console.log(item.text);
    });
    /*
        var list = [];
        var pdfBuffer = fs.readFileSync(filePath);

        new pdfreader.PdfReader().parseBuffer(pdfBuffer, function (err, item) {
            if (item.text) {
                // accumulate text items into rows object, per line
                console.log(item.text);
                console.log("---------------------------");
                // (rows[item.y] = rows[item.y] || []).push(item.text);
            }
        });
        
        console.log(items);
        */
    /*
    new pdfreader.PdfReader().parseFileItems(filePath, function (err, item) {
        if (err) callback(err);
        else if (!item) callback();
        else if (item.text) console.log(item.text);
    });
    */
};

var extractPdf = function (request, response) {
    var filePath = path.join(dirPath, "../UploadedScripts/2. TFN Information packet.pdf");
    var dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then((result) => {
        response.send(result);
        console.log(result);
    }).catch((error) => {
        response.status(500).send(error);
        console.log(error);
    })
};

var readTextFile = function (request, response) {
    var filePath = path.join(dirPath, "../UploadedScripts/nodejs https server.txt");
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err)
            response.status(500).send(err);
        else
            response.send(data);
    });
};

var readXlsFile = function (request, response) {
    var filePath = path.join(dirPath, '../UploadedScripts/test-file.xls');
    var data = xlsx.parse(fs.readFileSync(filePath));
    response.send(data);
};

var readDocx = function (request, response) {
    const {
        spawn,
        exec
    } = require('child_process');

    var filePath = path.join(dirPath, '../UploadedScripts/NJSOFTID.doc');
    const bat = spawn('cmd.exe', ['/c', 'antiword -m UTF-8.txt ' + filePath]);

    exec("c:\\antiword\\antiword.exe -m UTF-8.txt " + filePath, function (e, r) {
        console.log(e, r);
    });

    /*
     exec("./antiword.bat", function (e, r) {
         console.log(e, r);
     });
     */
    /*
    bat.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
    */
    /*
    var exec = require('child_process').exec;
    exec("antiword -m UTF-8.txt " + filePath, (err, stdOut) => {
        console.log(err, stdOut);
    });
    
    textract.fromFileWithPath(filePath, function (error, text) {
        if (error) {
            console.log(error);
            response.status(500).send(error);
        } else {
            console.log(text);
            response.send(text);
        }
    });
    */
    /*
     extractText(filePath).then(result => {
         response.send(result);
     }).catch(err => {
         response.send(err);
     });
     */
};

var readCsv = function (request, response) {
    var filePath = path.join(dirPath, '../UploadedScripts/FileMaster.csv');
    csv.parseFile(filePath, function (err, data) {
        if (err)
            response.status(500).send(err);
        else
            response.send(JSON.stringify(data));
    });
};

module.exports = {
    testPdfReader,
    extractPdf,
    readTextFile,
    readXlsFile,
    readDocx,
    readCsv
};