(function () {
    let bittSubmit = document.getElementById("BittSubmit");

    bittSubmit.addEventListener("click", function() {
        let username = document.getElementById("usernameBittInput").value;
        let text = document.getElementById("textBittArea").value;

        let jsonData = JSON.stringify({"username": username, "text": text});

        fetch("/create-bitt",{
            method: "post",
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(function(bitt){
            let container = document.getElementById("bittsContainer");

            // Extend HTML UI with new Bitt
            let bittElement = document.createElement("p");
            bittElement.innerHTML + bitt.text + "<br> <small>" + bitt.username + "</small>";
            container.prepend(bittElement);

            // Extend LocalStorage with new Bitt
            let storedBitts = JSON.parse(localStorage.bitts);
            storedBitts.unshift(bitt);
            localStorage.bitts = JSON.stringify(storedBitts);

            document.getElementById("createBittModal").click();
        })
        .catch(function(error){
            // Process API error
            console.log("Request failed", error);
        });
    });

}())