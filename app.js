function plateRecognation(){
	var fotoInput = document.querySelector("#imageupload");
	var key =  decrypt("gemini-pro", geminiKey());
	var model_image = decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c0600061b1c0e0a0353090c4315000e13002e06001d481e06500c001454") + key;
	var foto = window.localStorage.getItem('foto');

        var data = {
            contents: [
              {
                parts: [
                  { text: "Analise a imagem e retorne, em formato markdown, as seguintes propriedades: sexo, altura, IMC, peso, sessões dos treinos, alimentação, vitaminas, suplementos, intervalos e dicas de fitness. Além disso, inclua informações sobre nutrição, alimentos pesados, tipos de suplementos e equipamentos utilizados. Para o sexo masculino, o treino é focado em queimar gorduras e ganhar massa muscular, enquanto para o sexo feminino, o treino é direcionado para queimar gorduras, redefinir e tonificar, incluindo musculação" },
                  { inline_data: { mime_type: "image/png", data: foto } }
                ]
              }
            ],
            generationConfig: {
              stopSequences: ["Title"],
              temperature: 0.4,
              maxOutputTokens: 800,
              topP: 0.8,
              topK: 40
            }

        };

        fetch(model_image, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(obj => {
            
  
            if(obj.hasOwnProperty('error')){
                console.log('error', obj.error.status, "key", geminiKey());
            }else if(obj.promptFeedback && 'blockReason' in obj.promptFeedback){
                console.log('tem blockReason')
            }else{


                var string = obj.candidates[0].content.parts[0].text;
                console.log("resp",string);

                var filtrar = string.split('```json').join('').split('```').join('');
                console.log(JSON.parse(filtrar))

                var info = JSON.parse(filtrar);
                $("#info-marca").text(info.marca);
                $("#info-modelo").text(info.modelo);
                $("#info-cor").text(info.cor);

                
                const numeros = separarLetras(info.placa);
               
                $("#load-numeros").html('')
                $.each(numeros, function(k,v){
                	// console.log(v);
                	$("#load-numeros").append(v)
                })

                $(".mark").attr('style', `left: calc(${info.corde_x}px / 2 - 100px); 
                                          top: calc(${info.corde_y}px / 2 - 25px)`);
                

                 $("button").html(`
          				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
						</svg>
			            <span>Carregar Image</span>`);


                 
                  var plate = limparPlate(info.placa);
                  consultar(plate);
            }


            

          })
          .catch(error => {
            console.error('Erro na requisição:', error);
          });


}//plate

// plateRecognation()

function separarLetras(string) {
 

  // Verifica se a string é válida
  if (typeof string !== "string") {
    throw new Error("A entrada deve ser uma string.");
  }

  // Cria um array com as letras da string
  const letras = string.split("");

  // Cria um array com os spans das letras
  const spans = letras.map((letra) => {
    // Cria um span para cada letra
    
    return `<label>
              <input class="sr-only peer" name="size" type="radio" value="xs"  />
              <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                ${letra}
              </div>
            </label>`;
  });

  // Retorna os spans
  return spans;
}

function limparPlate(str) {
  // Criar uma expressão regular para caracteres especiais
  const regex = /[^a-zA-Z0-9\s]/g;

  // Substituir todos os caracteres especiais por uma string vazia
  const strSemCaracteresEspeciais = str.replace(regex, "");

  // Retornar a string sem caracteres especiais
  return strSemCaracteresEspeciais;
}

function consultar(e){
  $.post("php/consulta.php",{
    plate: e
  }, function(resp){
    console.log(resp)
  })
}