const fs = require('fs');

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (err, texto) => {
    if (err) {
        console.log('Erro ao ler o arquivo:', err);
        return;
    }
    quebraEmParagrafo(texto);
});

function quebraEmParagrafo(texto) {
    const paragrafos = texto.toLowerCase().split('\n');
    const contagem = paragrafos.map((paragrafo) => {
        return verificarPalavrasDuplicadas(paragrafo);
    });
    console.log(contagem);
}

function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificarPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(/\s+/); // separa por qualquer espaço
    const resultado = {}; // objeto correto
    listaPalavras.forEach((palavra) => {
        if (palavra.lenth >= 3) {
        const palavraLimpa = limpaPalavras(palavra);
        resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    })
    return resultado;
}
