let inputBox =  document.getElementById('shortenInput')
let urlList = document.getElementById('url-list')
let buttonIdCount = 0

document.getElementById("shortenItButton").addEventListener("click", async () => {
    let input = inputBox.value;
    let result = await getShortenedUrl(input);
    if(result!=null) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(input));
        let linkText = document.createTextNode(`${result}`);
        let link = document.createElement("a");
        link.appendChild(linkText);
        link.title = 'Shortened URL';
        link.href = `${result}`
        link.target = "_blank"
        li.appendChild(link)
        let button = document.createElement("button");
        button.innerHTML = "Copy";
        button.id = `${buttonIdCount}`;
        console.log('++')
        li.appendChild(button);
        urlList.appendChild(li);
        button.addEventListener('click', function() { 
            navigator.clipboard.writeText(result);
            console.log('copied')
            button.innerHTML = "Copied!"
            button.style.backgroundColor = "rgb(43, 6, 91)"
            buttonIdCount += 1
        });
    }
})

async function getShortenedUrl(input) {
    const proxyUrl = 'http://localhost:8080/';
    const apiUrl = 'https://cleanuri.com/api/v1/shorten';
    const data = `url=${encodeURIComponent(input)}`;
    const response = await fetch(proxyUrl + apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      })
    if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        changeErrorStyle("2px solid red", "visible")
    return null
    }
    const urlShortened = await response.json();
    return urlShortened.result_url
}

document.getElementById("shortenInput").addEventListener("click", () => {
    changeErrorStyle("none", "hidden")
})

function changeErrorStyle(inputBoxStyle, inputErrorText){
    inputBox.style.border = inputBoxStyle;
    document.getElementById("inputError").style.visibility = inputErrorText;
}
