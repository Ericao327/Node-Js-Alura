const fs = require('fs');
const { findPackageJSON } = require('module');

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    if (erro) { 
    console.log('qual é o erro?', erro.code);
        return
    }
});

function contarPalavras(texto) {
    const paragrafos = extraiParagrafos(texto)
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
            return verificarPalavrasDuplicadas(paragrafo); 
    })
    console.log(contagem);
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');
}

function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificarPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(/\s+/); // separa por qualquer espaço
    const resultado = {}; // objeto correto
    listaPalavras.forEach((palavra) => {
        if (palavra.length >= 3) {
        const palavraLimpa = limpaPalavras(palavra);
        resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    })
    return resultado;
}
5