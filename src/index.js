export function contarPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);

    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return [verificarPalavrasDuplicadas(paragrafo)];
    });
    return contagem;
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');
}

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificarPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(/\s+/);
    const resultado = {};

    listaPalavras.forEach((palavra) => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    });

    return resultado;
}
