function imagerec(imageb4, peso, altura, objetivo, regiao){

	$("#capture-btn").removeClass('upload');
	$("#capture-btn").addClass('uploadload');
	var key =  decrypt("gemini-pro", geminiKey());
	console.log('key', key)
	var model_image = decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c0600061b1c0e0a0353090c4315000e13002e06001d481e06500c001454") + key;
	var img = imageb4.split(',')[1];

        //Meta:
            // Sexo:
            // Altura:
            // IMC:
            // Peso:
            // Sessões dos treinos:
            // Alimentação:
            // Vitaminas:
            // Suplementos:
            // Intervalos:
            // Calorias Recomendadas:
            // Nutrição Recomendadaa:
            // Equipamentos Recomendados:
            // Dieta Recomendadas:
            // Dica extra:
            // Dicas de fitness:
        const prompt = `
            importante: Analise a imagem e retorne as seguintes propriedades no meu padão: 
            
            Sexo: Masculino / Feminino
            Altura: (em centímetros)
            IMC: (calcule aqui: https://www.endocrino.org.br/obesidade/)
            Peso: (em kg)
            Objetivo: Perder peso / Ganhar peso / Ganhar músculo / Perder músculo,
            Região: ${regiao}
            Treino:

            Sessões: (dias por semana e frequência)
            Tipo de treino: (musculação, cardio, HIIT, etc.)
            Nível: (iniciante, intermediário, avançado)
            Exercícios: (lista detalhada com séries, repetições e carga)
            Progressão: (como você pretende aumentar a intensidade ao longo do tempo)
            Descanso: (tempo entre os treinos e séries)
            Alimentação:

            Calorias: (recomendação diária)
            Macronutrientes: (proteína, carboidrato e gordura - porcentagem ou gramas)
            Micronutrientes: (vitaminas e minerais importantes)
            Alimentos: (exemplos de refeições e lanches)
            Restrições alimentares: (alergias, intolerâncias, preferências)
            Hidratação: (quantidade de água recomendada por dia)
            Suplementos:

            Proteína: (tipo, dosagem e momento de uso)
            Creatina: (tipo, dosagem e momento de uso)
            Outros: (pré-treino, pós-treino, multivitamínico, etc.)
            Equipamentos:

            Acessórios: (halteres, caneleiras, cinto, etc.)
            Máquinas: (academia ou em casa)
            Dicas Extras:

            Sono: (qualidade e quantidade)
            Estresse: (controle do estresse e técnicas de relaxamento)
            Motivação: (dicas para manter a motivação e disciplina)
            Progresso: (monitoramento do progresso e ajustes no plano)
            Comunidade: (grupos de apoio online ou presenciais)
            Profissional: (consulta com um profissional de educação física ou nutricionista)
            Dicas de Fitness:

            Aquecimento: (importante antes de cada treino)
            Alongamento: (importante após cada treino)
            Postura: (manter postura correta durante os exercícios)
            Técnica: (executar os exercícios com técnica correta para evitar lesões)
            Variedade: (variar os treinos para evitar monotonia e estimular o corpo)
            Paciência: (resultados levam tempo e dedicação)
            Consistência: (treinar e se alimentar de forma consistente)
            Diversão: (tornar os treinos divertidos para manter a motivação)



            Dados Reais do Usuario peso(${peso}), altura(${altura}), objetivo(${objetivo}), região(${regiao}). Caso alguns desses dados do usuário estejam vazios, estime um valor através da análise da imagem.
            Se a imagem não for de uma corpo humano(a) por completo, retorne um erro. todos item da lista tem que ser de extrema importancia.
            `;

        var data = {
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: "image/png", data: img } }
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
                $(".log").show();
                $("#capture-btn").removeClass('uploadload');
                $("#capture-btn").addClass('upload');
                
            }else if(obj.promptFeedback && 'blockReason' in obj.promptFeedback){
                console.log('tem blockReason')
                $(".log").show();
                $("#capture-btn").removeClass('uploadload');
                $("#capture-btn").addClass('upload');
            }else{

            	

                var string = obj.candidates[0].content.parts[0].text;
                console.log("resp",string);

                window.localStorage.setItem('info_fitness', btoa(string.toString()));
      
               
                
               
				$("#capture-btn").removeClass('uploadload');
				$("#capture-btn").addClass('upload');

				$("#capture-btn").attr('onclick', 'capturePhoto(this)')
				$(".preview").attr('style', "display:none;")
                window.location.href = '.info.'
            }


            

          })
          .catch(error => {
            console.error('Erro na requisição:', error);
            $(".log").show();
            $("#capture-btn").removeClass('uploadload');
                $("#capture-btn").addClass('upload');
          });


}//plate


// var rr = `Sexo: masculino
// Altura: 1,75m
// IMC: 24,9
// Peso: 70kg
// Sessões dos treinos: 3x por semana
// Alimentação: saudável, rica em frutas, verduras e proteínas
// Vitaminas: vitamina C, vitamina D e ômega-3
// Suplementos: whey protein, creatina e BCAA
// Intervalos: 30 segundos de descanso entre as séries
// Dicas de fitness: alongue-se antes e depois dos treinos, beba bastante água e durma bem
// Nutrição: carboidratos, proteínas e gorduras saudáveis
// Alimentos pesados: arroz, feijão, batata, macarrão
// Tipos de suplementos: whey protein, creatina, BCAA, glutamina, ZMA
// Equipamentos utilizados: halteres, barras, anilhas, corda, esteira, bicicleta ergométrica`;
// var ff = filterPro(rr);

// var nota =`<div class="card-padd">
// 			<div class="card nota">
// 	        		<div class="propriedade">Nota</div>
// 	        		<div class="valores">${paragraf(`Nossa aplicação utiliza análise de fotos e inteligência artificial para criar planos personalizados de sessões de exercícios, alimentação, nutrição, descanso, suplementos e vitaminas, adaptados ao corpo e às metas individuais de cada pessoa. É importante ressaltar que, embora os dados sejam processados por inteligência artificial e analisados a partir da foto fornecida, pode haver ocasionais lacunas de informação ou interpretações imprecisas, porém, mantendo um nível de precisão de cerca de 90%.`)}</div>
// 	        </div>
//         </div>`;

// $(".post").html(ff + nota);

// $(".result").css("top", "0px");