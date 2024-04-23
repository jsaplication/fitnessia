function encrypt(key,text) {
  const toHex = (byte) => ('0' + byte.toString(16)).slice(-2);
  const salt = key;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
    result += toHex(charCode);
  }
  return result;
}

function decrypt(key,encoded) {
  const fromHex = (hex) => parseInt(hex, 16);
  const salt = key;
  let result = '';
  for (let i = 0; i < encoded.length; i += 2) {
    const hexByte = encoded.slice(i, i + 2);
    const charCode = fromHex(hexByte) ^ salt.charCodeAt(i / 2 % salt.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}


function geminiKey() {
  var my_api = window.localStorage.getItem('my_apikey');
  var api_returno;

   var apiKeys = [
               // "262c17083d10693d080a3d08023c315b57474b20283607281b2647244a0e3d23580b5f304f4811",
               // "262c17083d106e2a131c353d372e0c0d193a23270809555f282c4429343635553f050f31454046",
               // "262c17083d106e4601230d34323a19044224023d2a5d3b285d245c5d0b0b175440031b2f493133",
               // "262c17083d106c2043060d5d3a270020690a270a2055145d571d6700335d2b2835190126741d19",
               // "262c17083d106f1f302b5312581c1607452041232137231f3c017a48140b05531c3d59017e453b",
               // "262c17083d106c2239090c3f3b013f2d770231060c3c2000311f7f070723133634025d30572537",
               // "262c17083d106f0a1c571e541d032b0d545d474252512e2f1a3a4338180d252f5e5f3a3d7c1a05",
               // "262c17083d106f5d403e4a235d1e0a2e7209280c3d1c270f3e59573544361f0b075e225b602f46",
               // "262c17083d10691b192d313a1a1900007842203a513a2c30072859413d58315d180c340c4a1d37",
               // "262c17083d106c22212837162a1a3c3c7b283d2e1d012200020b61223a1c0f320c392b2f725d33",
               // "262c17083d106f092b2b0a2f1f3a2a386007050d09033f3314396e2f002657212520095a68312b",
               // "262c17083d106942280d2e032a3907044c42373f33573421042c671f335a283f1c11040f1b1a01",
               // "262c17083d106922113d013f1b08590f7a08135f02323a3c5e5c1a4441172127212f26196c214a",
               // "262c17083d106c0837160c063d39275d62413a3d5030095e34101b1d201b23091c222623591d27",
               // "262c17083d1069265f0903280c1a3f0d58041f030c0b1801373868333a18053f3f0c380347411d",
               // "262c17083d10693f3d05092c1a1004446638270514003c04315f66162b370d20022a312a4f1211",
               // "262c17083d106e173d3b365d581f163d721b0229022a5c1d18197d16283f1d035a1857135c384a",
               // "262c17083d106c482129521f2f2d0d0e66003e5b00320c02162c4521331f1d2b172c1f28741b37"
                  "262c17083d106f41192e3d071d3f3d507a45191c1f080c2f31595d1845352a082759573a69023b",
                  "262c17083d106f38242320565a1024217e1d351b2f3c1a3b0d23483b3c28090a1c1f3127693801",
                  "262c17083d106e41395b2e35262a21585e041b05013208243c3c5c45025b2b2c5b0e2d5b6b2a15",
                  "262c17083d106f48430a03172c1f342d6e05445710221a0e24387e0907172d23195d020d4f2f01"
               ];
  // gera um índice aleatório entre 0 e o tamanho do array
  const indiceAleatorio = Math.floor(Math.random() * apiKeys.length);



  if(my_api == '' || my_api == undefined || my_api == null){
    api_returno = apiKeys[indiceAleatorio];
  }else{
    api_returno = my_api;
  } 
 
  // retorna a API key no índice aleatório
  return api_returno;
}




// function foto(input) {

//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//     reader.onload = function(e) {
    
//       var img = e.target.result.split(',')[1];
    
//       window.localStorage.setItem("foto", img);
//       window.localStorage.setItem("foto-src", e.target.result);
      
//       $("#pre").attr('src', e.target.result);
//       console.log('upload')
//       plateRecognation()
//     }

//     reader.readAsDataURL(input.files[0]);
//   }
// }

// const fileButton = document.getElementById('file-button');

//   fileButton.addEventListener('click', () => {
//     const inputFile = document.createElement('input');
//     inputFile.type = 'file';
//     inputFile.accept = 'image/*';
//     inputFile.multiple = true;

//     inputFile.addEventListener('change', () => {
//       $("button").html(`
//            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//           </svg>

//             <span>Analizando...</span>`);

//                 $("#info-marca").text('Analizando...');
//                 $("#info-modelo").text('Analizando...');
//                 $("#info-cor").text('Analizando...');
//                 $("#load-numeros").text('');


//       const files = inputFile.files;
//       console.log(files);
//       foto(inputFile);
//       // Aqui você pode processar os arquivos selecionados
//     });

//     inputFile.click();
// });
