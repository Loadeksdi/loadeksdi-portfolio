//const socket = io("localhost:3000/");
const socket = io("discord-bridge.loadeksdi.com");
const chat = document.querySelector(".chat");
const messages = [];
const scrollbutton = document.querySelector(".scrolltotop");
let first = true;
let author;
let id;
let slideIndex = 0;
showSlides();

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
}

socket.on('message', async (msg) => {
    messages.push({
        date: new Date(),
        author: "Loadeksdi",
        text: msg.text
    });
    updateChat();
});

socket.on('accinfo', async (acc) => {
    const accinfo = document.querySelector(".lolinfographic");
    const highestEloAcc = acc[0].wr > acc[1].wr ? acc[0] : acc[1];
    const headers = Array.from(accinfo.childNodes).filter(node => {
        return node.nodeType !== 3;
    });
    headers[0].textContent = highestEloAcc.name;
    headers[1].textContent = `${highestEloAcc.tier} ${highestEloAcc.rank}`;
    headers[2].textContent = `${highestEloAcc.lp}LP`
    headers[3].textContent = `${new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(highestEloAcc.wr * 100)}% winrate`;
    let textcolor;
    switch (highestEloAcc.tier) {
        case "GOLD":
            textcolor = "#f4d175";
            break;
        case "PLATINUM":
            textcolor = "#6aa2a2";
            break;
        case "DIAMOND":
            textcolor = "#5c6eb1";
            break;
    }
    headers[1].style.color = textcolor;
    if (highestEloAcc.name === "LearnByUnmaking") {
        const img = document.querySelector(".lolpic img");
        img.srcset = "/assets/images/lol2.webp";
        img.src = "/assets/images/lol2.jpg";
    }
});

function updateChat() {
    let str = "";
    messages.forEach(msg => {
        str += `[${msg.date.toLocaleString(navigator.language)}] ${msg.author} : ${msg.text}\n`;
    });
    chat.value = str;
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
            scrollbutton.style.display = "none";
            break;
        case 1:
            document.querySelector(".introduction").style.display = "block";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "none";
            scrollbutton.style.display = "none";
            break;
        case 2:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "block";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "none";
            scrollbutton.style.display = "none";
            break;
        case 3:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "block";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "none";
            scrollbutton.style.display = "block";
            break;
        case 4:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "block";
            document.querySelector(".activity").style.display = "none";
            scrollbutton.style.display = "none";
            break;
        case 5:
            document.querySelector(".introduction").style.display = "none";
            document.querySelector(".pro").style.display = "none";
            document.querySelector(".interests").style.display = "none";
            document.querySelector(".projects").style.display = "none";
            document.querySelector(".activity").style.display = "block";
            scrollbutton.style.display = "none";
    }
}