var appDiv = document.getElementById("appLink")
var portalDiv = document.getElementById("portalLink")

appDiv.children[1].remove() // Remove text from webapp button
portalDiv.children[1].remove() // Remove text from portal button

appDiv.children[0].innerHTML = "Nieuw"
portalDiv.children[0].innerHTML = "Oud"

appDiv.href = appDiv.href.replace("/main", "/app")