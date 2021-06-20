(function () {
// just a wrapper to avoid global scope

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if(this.status === 200) {
                let container = document.getElementById("bittsContainer");
                let bitts = JSON.parse(xhttp.responseText);


                for(let bitt of bitts) {
                    let bittElement = document.createElement("p");
                    bittElement.innerHTML = bitt.text + "<br> <small>" + bitt.username + "</small";

                    container.appendChild(bittElement);
                }

            } else {
                console.log("Oops, there was an error processing API request");
            }
        }
    };

    xhttp.open("GET", "/get-all-bitts", true);
    xhttp.send();

}())
