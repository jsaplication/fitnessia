ImagemAI.initialize("quero informação desse veiculo quero a cor, modelo, tipo de veiculo, eo numero da placa. agora quero o resultado em json nesse formato: marca, modelo, cor, placa");

function ImagemAiInfo(e){
    console.log('test',e);
    document.querySelector("#pre").setAttribute('src', e.imagem);
    console.log(e.data)

    if(e.data != null){
        console.log('vaziu')
        document.querySelector("#cor").textContent = e.data.response.cor;
        document.querySelector("#modelo").textContent = e.data.response.modelo;
        document.querySelector("#marca").textContent = e.data.response.marca;
        document.querySelector("#placa").textContent =e.data.response.placa;
    }else{
        console.log('test')
    }
   
}
