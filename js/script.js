//const socket = io("localhost:3000");
const socket = io("discord-bridge.loadeksdi.com");
const messages = [];
let first = true;
let author;
let id;
const chat = document.querySelector(".chat");

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

socket.on('message', async (msg) => {
    messages.push({
        date: new Date(),
        author: "Loadeksdi",
        text: msg.text
    });
    updateChat();
});

function updateChat() {
    let str = "";
    messages.forEach(msg => {
        str += `[${msg.date.toLocaleString(navigator.language)}] ${msg.author} : ${msg.text}\n`;
    });
    chat.value = str;
}

document.querySelector("form").addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.querySelector(".message");
    if (first) {
        author = input.value;
        chat.value = `You logged in as ${input.value}!`;
        input.placeholder = "Enter a message";
        input.maxlength = 2000;
        input.value = "";
        first = false;
        return;
    }
    id = id === undefined ? uuidv4() : id;
    if (input.value) {
        const message = {
            id,
            author: nickname.value,
            text: input.value
        };
        input.value = "";
        socket.emit('message', message);
        message.date = new Date();
        messages.push(message);
        updateChat();
    }
});

function updateDocumentBasedOnCaller(caller) {
    switch (caller) {
        case 0:
            document.querySelector("html").style.background = "rgba(49, 49, 57, 1) no-repeat";
            document.querySelector(".content").style.display = "none";
            document.querySelector(".container").style.display = "flex";
            document.querySelector(".introduction").style.display = "block";
            document.querySelector(".top").style.display = "block";
            document.querySelector("footer").style.display = "block";
            break;
        case 1:
            document.querySelector(".introduction").style.display = "block";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "none";
            break;
        case 2:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "block";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "none";
            break;
        case 3:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "block";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "none";
            break;
        case 4:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "block";
            document.querySelector(".activity").style.display = "none";
            break;
        case 5:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "block";
    }
}