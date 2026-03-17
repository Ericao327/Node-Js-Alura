import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contarPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error(chalk.red('erro: favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {       
            processaArquivo(caminhoTexto, caminhoDestino);   
            console.log(chalk.green('texto processado com sucesso'));  
        } catch (erro) {
            console.log('ocorreu um erro no processamento', erro);
        }
    });

program.parse();

function processaArquivo(caminhoTexto, endereco) {
    fs.readFile(caminhoTexto, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro;

            const resultado = contarPalavras(texto);
            criaESalvaArquivo(resultado, endereco);

        } catch (erro) {
            trataErros(erro);
        }
    });
}

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = path.join(endereco, 'resultado.txt');
    const textoPalavras = montaSaidaArquivo(listaPalavras);

    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado');
    } catch (erro) {
        throw erro;
    }
}
