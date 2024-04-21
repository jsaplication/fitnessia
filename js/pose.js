// async function detectPose(video, canvas, ctx) {
//             // Carregar o modelo PoseNet
//             const net = await posenet.load();

//             // Função de loop para detectar pose em cada frame do vídeo
//             async function poseDetectionFrame() {
//                 const pose = await net.estimateSinglePose(video, {
//                     flipHorizontal: false
//                 });

//                 // Limpar o canvas
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);

//                 // Desenhar pose na tela
//                 drawPose(pose, ctx);

//                 requestAnimationFrame(poseDetectionFrame);
//             }

//             // Função para desenhar a pose no canvas
//             function drawPose(pose, ctx) {
//                 const keypoints = pose.keypoints;

//                 // Desenhar pontos da pose
//                 for (let i = 0; i < keypoints.length; i++) {
//                     const { x, y } = keypoints[i].position;
//                     ctx.beginPath();
//                     ctx.arc(x, y, 5, 0, 2 * Math.PI);
//                     ctx.fillStyle = 'red';
//                     ctx.fill();
//                 }

//                 // Conectar os pontos da pose
//                 const adjacentKeyPoints = [
//                     [5, 6], [5, 7], [7, 9], [6, 8], // Braços
//                     [11, 12], [11, 13], [13, 15], [12, 14], // Pernas
//                     [5, 11], [6, 12] // Tronco
//                 ];

//                 for (let i = 0; i < adjacentKeyPoints.length; i++) {
//                     const [pointAIndex, pointBIndex] = adjacentKeyPoints[i];
//                     const pointA = keypoints[pointAIndex].position;
//                     const pointB = keypoints[pointBIndex].position;
//                     drawSegment(pointA, pointB, ctx);
//                 }
//             }

//             // Função para desenhar segmentos entre pontos da pose
//             function drawSegment(pointA, pointB, ctx) {
//                 ctx.beginPath();
//                 ctx.moveTo(pointA.x, pointA.y);
//                 ctx.lineTo(pointB.x, pointB.y);
//                 ctx.lineWidth = 2;
//                 ctx.strokeStyle = '#0080ff';
//                 ctx.stroke();
//             }

//             // Iniciar detecção de pose
//             poseDetectionFrame();
// }


async function detectPoseFromBase64Image(base64Image, canvas, ctx) {
    // Carregar o modelo PoseNet
    const net = await posenet.load();

    // Criar um novo objeto de imagem
    const img = new Image();

    // Quando a imagem estiver carregada, iniciar a detecção de pose
    img.onload = async function() {
        // Redimensionar o canvas de acordo com as dimensões da imagem original
        canvas.width = img.width;
        canvas.height = img.height;

        // Limpar o canvas antes de desenhar a imagem
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar a imagem no canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Detectar pose na imagem
        const pose = await net.estimateSinglePose(canvas, {
            flipHorizontal: false
        });

        // Desenhar pose na tela
        drawPose(pose, ctx);
    };

    // Definir a fonte da imagem como a base64
    img.src = base64Image;
}
// Função para desenhar a pose no canvas
// function drawPose(pose, ctx) {
//     const keypoints = pose.keypoints;

//     // Desenhar pontos da pose
//     for (let i = 0; i < keypoints.length; i++) {
//         const { x, y } = keypoints[i].position;
//         ctx.beginPath();
//         ctx.arc(x, y, 5, 0, 2 * Math.PI);
//         ctx.fillStyle = 'red';
//         ctx.fill();
//     }

//     // Conectar os pontos da pose
//     const adjacentKeyPoints = [
//         [5, 6], [5, 7], [7, 9], [6, 8], // Braços
//         [11, 12], [11, 13], [13, 15], [12, 14], // Pernas
//         [5, 11], [6, 12] // Tronco
//     ];

//     for (let i = 0; i < adjacentKeyPoints.length; i++) {
//         const [pointAIndex, pointBIndex] = adjacentKeyPoints[i];
//         const pointA = keypoints[pointAIndex].position;
//         const pointB = keypoints[pointBIndex].position;
//         drawSegment(pointA, pointB, ctx);
//     }
// }

// Função para desenhar a pose no canvas
function drawPose(pose, ctx) {
    const keypoints = pose.keypoints;

    // Estilo dos pontos
    const corPonto = 'rgba(255, 0, 0, 0.6)';
    const raioPonto = 5;
    const larguraBordaPonto = 2;
    const corBordaPonto = 'rgba(255, 255, 255, 0.8)';
    const fonte = '14px Arial'; // Estilo da fonte para o nome dos membros
    const corTexto = 'white'; // Cor do texto

    // Nomes dos membros em português
    const nomesMembros = {
        leftShoulder: 'Ombro Esquerdo.',
        rightShoulder: 'Ombro Direito.',
        leftElbow: 'Cotovelo Esquerdo.',
        rightElbow: 'Cotovelo Direito.',
        leftWrist: 'Pulso Esquerdo.',
        rightWrist: 'Pulso Direito.',
        leftHip: 'Quadril Esquerdo.',
        rightHip: 'Quadril Direito.',
        leftKnee: 'Joelho Esquerdo.',
        rightKnee: 'Joelho Direito.',
        leftAnkle: 'Tornozelo Esquerdo.',
        rightAnkle: 'Tornozelo Direito.'
    };

    // Desenhar pontos da pose, excluindo os pontos do rosto
    for (let i = 0; i < keypoints.length; i++) {
        const { x, y } = keypoints[i].position;
        const nomeMembro = nomesMembros[keypoints[i].part];

        // Se o nome do membro não for undefined (não for um ponto do rosto)
        if (nomeMembro) {
            // Desenhar o círculo
            ctx.beginPath();
            ctx.arc(x, y, raioPonto, 0, 2 * Math.PI);
            ctx.fillStyle = corPonto;
            ctx.fill();

            // Adicionar contorno
            ctx.lineWidth = larguraBordaPonto;
            ctx.strokeStyle = corBordaPonto;
            ctx.stroke();

            // Adicionar nome do membro
            ctx.font = fonte;
            ctx.fillStyle = corTexto;
            ctx.fillText(nomeMembro, x + 5, y - 5); // Ajustar a posição do texto
        }
    }

    // Conectar os pontos da pose
    const pontosAdjacentes = [
        ['leftShoulder', 'rightShoulder'],
        ['leftShoulder', 'leftHip'],
        ['rightShoulder', 'rightHip'],
        ['leftShoulder', 'leftElbow'],
        ['rightShoulder', 'rightElbow'],
        ['leftElbow', 'leftWrist'],
        ['rightElbow', 'rightWrist'],
        ['leftHip', 'rightHip'],
        ['leftHip', 'leftKnee'],
        ['rightHip', 'rightKnee'],
        ['leftKnee', 'leftAnkle'],
        ['rightKnee', 'rightAnkle']
    ];

    for (let i = 0; i < pontosAdjacentes.length; i++) {
        const [membroA, membroB] = pontosAdjacentes[i];
        const pontoA = keypoints.find((kp) => kp.part === membroA).position;
        const pontoB = keypoints.find((kp) => kp.part === membroB).position;
        drawSegment(pontoA, pontoB, ctx);
    }
}


// Função para desenhar segmentos entre pontos da pose
function drawSegment(pointA, pointB, ctx) {
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}
