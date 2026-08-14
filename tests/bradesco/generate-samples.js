const fs=require("fs");
const path=require("path");
const {makeFile}=require("./fixtures.js");

const outputDir=path.resolve(__dirname,"../../exemplos");
const valid=makeFile();
const invalid=makeFile({
  form:"41",
  detailSpecs:[
    {key:"segmento_a",overrides:{18:"700"}},
    {key:"segmento_b",overrides:{18:"1",19:"52998224724",233:"00000000"}},
  ],
  trailerOverrides:{24:"999"},
});
fs.writeFileSync(path.join(outputDir,"bradesco-valido.rem"),valid.join("\r\n")+"\r\n","latin1");
fs.writeFileSync(path.join(outputDir,"bradesco-invalido.rem"),invalid.join("\r\n")+"\r\n","latin1");
console.log(`Amostras Bradesco geradas em ${outputDir}.`);
