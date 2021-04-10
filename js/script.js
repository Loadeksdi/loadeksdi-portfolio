const messages = new Map();
let author;

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

function sendMessage(){
    const message = JSON.stringify({message: {
        author: author === undefined ? document.querySelector(".nickname").value : author,
        text: document.querySelector(".message").value
    }});
    const date = new Date();
    const url = "https://discord-bridge.loadeksdi.com:443"
    fetch(url, {
        method: "POST",
        body: message,
        headers : new Headers({'Content-Type': 'application/json'}),
        mode: "cors"
    }).then(res => {console.log(res)});
    messages.set(date, message);
}