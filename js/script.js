//const socket = io("localhost:3000");
const socket = io("discord-bridge.loadeksdi.com");
const messages = [];

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
        str += `[${msg.date.toLocaleString(navigator.language, { timeZone: 'UTC' })}] ${msg.author} : ${msg.text}\n`;
    });
    document.querySelector(".chat").value = str;
}

document.querySelector("form").addEventListener('submit', function(e) {
    e.preventDefault();
    const nickname = document.querySelector(".nickname");
    nickname.readOnly = true;
    const input = document.querySelector(".message");
    if (input.value) {
        const message = {
            author: nickname.value,
            text: input.value
        };
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