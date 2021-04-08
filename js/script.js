function updateDocumentOnButtonClick() {
    document.querySelector("html").style.background = "rgba(49, 49, 57, 1) no-repeat";
    document.querySelector(".content").style.display = "none";
    document.querySelector(".container").style.display = "flex";
    document.querySelector(".introduction").style.display = "block";
    document.querySelector(".top").style.display = "block";
    document.querySelector("footer").style.display = "block";
}

function updateDocumentOnProClick(){
    document.querySelector(".introduction").style.display = "none";
    document.querySelector(".pro").style.display = "block";
}