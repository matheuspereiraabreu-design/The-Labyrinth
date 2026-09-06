function startGame() {
    console.log("O jogo começou!");

    window.location.href = "historia.html";
}

function personagens() {
    window.location.href = "personagens.html";
}

const dialogues = [
    {
        character: "CHARLIE",
        text: "Você tem certeza que esse é o caminho?"
    },

    {
        character: "AMY",
        text: "Tenho... eu acho."
    },

    {
        character: "CHARLIE",
        text: "Você acha?"
    },

    {
        character: "AMY",
        text: "Tá, talvez eu não tenha tanta certeza."
    },

    {
        character: "OSWALD",
        text: "A gente já passou por essa rua."
    },

    {
        character: "CHARLIE",
        text: "Como você sabe?"
    },

    {
        character: "OSWALD",
        text: "Aquela loja ali. Eu lembro dela."
    }
];


let currentDialogue = 0;
let currentCharacter = 0;

let isTyping = false;
let typingSpeed = 35;
let typingTimer;


const characterName = document.querySelector("#character-name");
const dialogueText = document.querySelector("#dialogue-text");
const nextButton = document.querySelector("#next-button");


function showDialogue() {

    clearInterval(typingTimer);

    const dialogue = dialogues[currentDialogue];

    characterName.textContent = dialogue.character;

    dialogueText.textContent = "";

    currentCharacter = 0;
    isTyping = true;

    typingTimer = setInterval(() => {

        dialogueText.textContent += dialogue.text[currentCharacter];

        currentCharacter++;

        if (currentCharacter >= dialogue.text.length) {

            clearInterval(typingTimer);

            isTyping = false;

            nextButton.classList.add("ready");

        }

    }, typingSpeed);

}


function nextDialogue() {

    // Se ainda estiver digitando,
    // completa a frase imediatamente.

    if (isTyping) {

        clearInterval(typingTimer);

        dialogueText.textContent = dialogues[currentDialogue].text;

        currentCharacter = dialogues[currentDialogue].text.length;

        isTyping = false;

        nextButton.classList.add("ready");

        return;
    }


    // Passa para a próxima fala.

    currentDialogue++;

   if (currentDialogue >= dialogues.length) {
    nextButton.disabled = true;
    nextButton.classList.remove("ready");
    return;
}

    nextButton.classList.remove("ready");

    showDialogue();

}


nextButton.addEventListener("click", nextDialogue);


document.addEventListener("keydown", (event) => {

    if (event.code === "Space" || event.code === "Enter") {

        event.preventDefault();

        nextDialogue();

    }

});


showDialogue();