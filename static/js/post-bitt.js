(function () {

    let bittSubmit = document.getElementById("bittSubmit");

    bittSubmit.addEventListener("click", function() {
        let username = document.getElementById("usernameBittInput").value;
        let text = document.getElementById("textBittArea").value;

        let jsonData = JSON.stringify({"username": username, "text": text});

        let xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    console.log(xhttp.responseText);

                    bitt = JSON.parse(xhttp.responseText);

                    let container = document.getElementById("bittsContainer");

                    let bittElement = document.createElement("p");
                    bittElement.innerHTML = bitt.text + "<br> <small>" + bitt.username + "</small>";

                    container.prepend(bittElement); // put the bitt at the top of the page (prepend)

                    document.getElementById("createBittModal").click(); // close the modal
                } else {
                    console.log("Ooops, there was an error...");
                }
            }
        };

        xhttp.open("POST", "/create-bitt", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(jsonData);
    });

}())