
var fs = require('fs');
var zlib = require('zlib')

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var originalString = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    const base64String = Buffer.from(originalString).toString('base64');

    return base64String;
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = Buffer.from(base64str, 'base64') // .toString('binary');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

function unzip(buf, file) {
    
    unzip_buffer = zlib.gunzipSync(Buffer.from(buf, 'base64'))
    fs.writeFileSync(file, unzip_buffer)

}

function zip(file) {
    var originalString = fs.readFileSync(file)
    return zlib.gunzipSync(Buffer.from(buf))
}


//function getAsciinemaPlayerJSContent(base64str) {
//    return atob(`' + base64str + '`)
//}

if (!process.argv.length === 4) {
    console.error(process.argv.length)
    console.error('Expected 2 argument!: <js script file> <css file>');
    process.exit(1);
 } 

 const jsFile = process.argv[2]
 const cssFile = process.argv[3]
 
  
// convert js zip to base64 encoded string
var base64strJS = base64_encode('asciinema-player.js.gz');
// convert base64 string back to zip 
//base64_decode(base64strJS, 'asciinema-player.js.rezip');
// Convert bas64 to buffer and unzip
//unzip(base64strJS, 'asciinema-player.js.txt')

// convert css zip to base64 encoded string
var base64strCSS = base64_encode('asciinema-player.css.gz');


var codePre = "var zlib = require('zlib')\n\
function unzip(buf) {\n\
    return zlib.gunzipSync(Buffer.from(buf, 'base64'))\n\
}\n"

var codeJS = 'export const getAsciinemaPlayerJSContent = () => {\n    return unzip(`' + base64strJS + '`)\n}\n'
var codeCSS = 'export const getAsciinemaPlayerCSSContent = () => {\n    return unzip(`' + base64strCSS + '`)\n}\n'
var code = codePre + codeJS + codeCSS

fs.writeFileSync('../src/asciinema-assets.ts', code);

//console.log(base64str);

