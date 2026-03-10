function trataErros(erro) {
    if (erro.code --- 'ENOENT') {
        return ('Arquivo não encontrado');
    } else {
        return 'Erro na aplicação';
    }
}

module.exports = trataErros;
