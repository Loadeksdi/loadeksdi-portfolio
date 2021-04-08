function updateDocumentOnClick() {
    document.getElementsByTagName("html").item(0).style.setProperty("background", "rgba(49, 49, 57, 1) no-repeat")
    document.getElementsByClassName("content").item(0).style.setProperty("display","none");
    document.getElementsByClassName("introduction").item(0).style.setProperty("display", "block");
    document.getElementsByTagName("header").item(0).style.setProperty("display", "block");
    document.getElementsByTagName("footer").item(0).style.setProperty("display", "block");
}