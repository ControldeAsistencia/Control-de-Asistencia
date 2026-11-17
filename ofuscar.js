// Uso: node ofuscar.js fuente.html salida.html
// Ofusca solo el último <script> (el código del sistema); las librerías QR quedan igual.
const fs = require('fs');
const JO = require('javascript-obfuscator');
const [,, entrada, salida] = process.argv;
const html = fs.readFileSync(entrada, 'utf8');
const ini = html.lastIndexOf('<script>'), fin = html.lastIndexOf('</script>');
const codigo = html.slice(ini + 8, fin);
const r = JO.obfuscate(codigo, {
  compact: true, simplify: true,
  controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.3,
  deadCodeInjection: false,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: true,
  selfDefending: true,
  stringArray: true, stringArrayEncoding: ['base64'], stringArrayThreshold: 0.8,
  stringArrayRotate: true, stringArrayShuffle: true,
  splitStrings: true, splitStringsChunkLength: 8,
  transformObjectKeys: false,
  unicodeEscapeSequence: false
});
fs.writeFileSync(salida, html.slice(0, ini + 8) + '\n' + r.getObfuscatedCode() + '\n' + html.slice(fin));
console.log('Listo:', salida);
