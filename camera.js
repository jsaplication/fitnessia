// // Crie um elemento de vídeo HTML5
// const video = document.createElement('video');

// // Adicione um evento de escuta para o evento "play" do elemento de vídeo
// video.addEventListener('play', () => {
//   // Crie um novo objeto Canvas
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');

//   // Capture um quadro do vídeo
//   const frame = context.drawImage(video, 0, 0);

//   // Detecte os veículos no quadro usando a biblioteca TensorFlow.js
//   const model = tf.loadGraphModel('model.json');
//   const input = tf.browser.fromPixels(frame);
//   const output = model.execute(input);

//   // Desenhe uma caixa ao redor dos veículos
//   const boxes = output.dataSync();
//   for (let i = 0; i < boxes.length; i += 4) {
//     const x = boxes[i];
//     const y = boxes[i + 1];
//     const width = boxes[i + 2];
//     const height = boxes[i + 3];

//     context.strokeStyle = 'red';
//     context.lineWidth = 2;
//     context.strokeRect(x, y, width, height);
//   }

//   // Tire uma foto do quadro
//   const dataURL = canvas.toDataURL('image/png');
// });

// // Adicione o elemento de vídeo ao documento
// document.body.appendChild(video);

// // Reproduza o vídeo
// video.src = 'video.mp4';
// video.play();