# `unwrap-result`

O módulo `unwrap-result` fornece métodos para lidar com resultados e erros de forma segura, adicionando métodos globais aos protótipos de funções e Promises. Este módulo é compatível com CommonJS (CSJ), ES Modules (ESM) e browsers, e não requer exportação explícita, pois os métodos são inseridos diretamente no escopo global.

## Instalação

Você pode incluir o módulo `unwrap-result` em seu projeto de diferentes maneiras, dependendo do seu ambiente:

### Para projetos Node.js (CommonJS ou ES Modules)

1. **Via npm**: Se o módulo estiver publicado no npm, você pode instalá-lo com:

    ```bash
    npm install unwrap-result
    ```

2. **Via importação direta**: Se você não estiver usando npm, pode baixar o arquivo e incluí-lo diretamente no seu projeto.

### Para projetos no navegador

1. **Via script tag**: Adicione o seguinte script ao seu HTML:

    ```html
    <script src="https://cdn.jsdelivr.net/npm/unwrap-result@latest/index.js"></script>
    ```

## Uso

Após incluir o módulo, os métodos serão adicionados globalmente aos protótipos de funções e Promises. Você pode usar os métodos `Symbol.result` para tratar resultados e erros de maneira segura.

```javascript
import 'unwrap-result';
```

### Exemplo de Uso

#### Função assíncrona

```javascript
// Usando o método em uma função
const [err, res] = await fetch[Symbol.result]('https://api.example.com');

if (err) {
    console.error('Erro ao fazer a requisição:', err);
    return;
}

const [jsonErr, json] = await res.json[Symbol.result]();

if (jsonErr) {
    console.error('Erro ao processar o JSON:', jsonErr);
} else {
    console.log('Dados recebidos:', json);
}
```

#### Função síncrona

```javascript
// Usando o método em uma função
const fn = function (a: number, b: any){
    if(typeof a !== "number" || typeof b !== "number"){
        throw "Só é aceitável parâmetros do tipo number";
    }
    return (a + b) / 2;
}

const [err, res] = fn[Symbol.result](1, 2);

if (err) {
    console.error('Erro ao executar a função:', err);
    return;
}

console.log('Resultado:', res);
```

## Métodos Adicionados

### `Symbol.result`

Adiciona um método ao protótipo das funções e Promises para executar uma função ou Promise de forma segura, retornando um array com dois valores:

- O primeiro valor é um possível erro (ou `null` se não houver erro).
- O segundo valor é o resultado da operação.

## Compatibilidade

O módulo é compatível com:

- **CommonJS (CSJ)**
- **ES Modules (ESM)**
- **Browsers**

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o desenvolvimento do módulo, sinta-se à vontade para enviar pull requests ou abrir issues.