const ImagemAI = {
  prompt: '',

  initialize(prompt) {
    this.prompt = prompt;
  },

  async imagemAiAsync(photo) {
    try {
      if (!this.prompt) {
        throw {
          status: 'error',
          message: 'Prompt not set. Please call initialize() with a prompt.',
          response: '',
        };
      }

      const key = this.decrypt("gemini-pro", this.geminiKey());
      const model =
        this.decrypt(
          "gemini-pro",
          "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c0600061b1c0e0a0353090c4315000e13002e06001d481e06500c001454"
        ) + key;

      const data = {
        contents: [
          {
            parts: [
              { text: this.prompt },
              { inline_data: { mime_type: "image/png", data: photo } },
            ],
          },
        ],
        generationConfig: {
          stopSequences: ["Title"],
          temperature: 0.4,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40,
        },
      };

      const response = await fetch(model, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const obj = await response.json();

      if (obj.hasOwnProperty("error")) {
        throw {
          status: "error",
          message: obj.error.status + " apikey: " + this.geminiKey(),
          response: '',
        };
      } else if (obj.promptFeedback && "blockReason" in obj.promptFeedback) {
        console.log("tem blockReason");
        throw {
          status: "error",
          message: obj.error.status,
          response: '',
        };
      } else {
        const string =
          obj.candidates[0].content.parts[0].text;
        const filtrar = string
          .split("```json")
          .join("")
          .split("```")
          .join("");
        // console.log(JSON.parse(filtrar));

        const info = JSON.parse(filtrar);
        return {
          status: "success",
          message: "",
          response: info,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: error,
        response: '',
      };
    }
  },

  async processPhoto(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          const img = e.target.result.split(",")[1];
          try {
            const result = await this.imagemAiAsync(img);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };

        reader.readAsDataURL(input.files[0]);
      });
    }
  },

  encrypt(key, text) {
    const toHex = (byte) => ("0" + byte.toString(16)).slice(-2);
    const salt = key;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
      result += toHex(charCode);
    }
    return result;
  },

  decrypt(key, encoded) {
    const fromHex = (hex) => parseInt(hex, 16);
    const salt = key;
    let result = "";
    for (let i = 0; i < encoded.length; i += 2) {
      const hexByte = encoded.slice(i, i + 2);
      const charCode =
        fromHex(hexByte) ^ salt.charCodeAt(i / 2 % salt.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  },

  geminiKey() {
    var my_api = window.localStorage.getItem("my_apikey");
    var api_returno;

    var apiKeys = ["262c17083d10693d080a3d08023c315b57474b20283607281b2647244a0e3d23580b5f304f4811"];

    const indiceAleatorio = Math.floor(Math.random() * apiKeys.length);

    if (my_api == "" || my_api == undefined || my_api == null) {
      api_returno = apiKeys[indiceAleatorio];
    } else {
      api_returno = my_api;
    }

    return api_returno;
  },


};

const fileButton = document.getElementById("imagemai-button");
fileButton.addEventListener("click", () => {
  const inputFile = document.createElement("input");
  inputFile.type = "file";
  inputFile.accept = "image/*";
  inputFile.multiple = true;

  inputFile.addEventListener("change", () => {
    const files = inputFile.files;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;

    var datajson ={
            data: null,
            imagem: base64Data
    }
    ImagemAiInfo(datajson);


            //solicitação
    ImagemAI.processPhoto(inputFile)
      .then((result) => {
        var datajson ={
            data: result,
            imagem: base64Data
        }
        ImagemAiInfo(datajson);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
      };

      // Lê o conteúdo do arquivo como base64
      reader.readAsDataURL(files[0]);
    }

    });

  inputFile.click();
});
