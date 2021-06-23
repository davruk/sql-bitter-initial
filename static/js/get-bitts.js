(function() {
    let storedBitts = localStorage.bitts;

    if (storedBitts) {
        console.log("Get Bitts from LocalStorage");

        let container = document.getElementById("bittsContainer");
        let bitts = JSON.parse(storedBitts);

        for (let bitt of bitts) {
            let bittElement = document.createElement("p");
            bittElement.innerHTML = bitt.text + "<br><small>" + bitt.username + "</small>";
            container.appendChild(bittElement);
        }
    }
    else {
        console.log("Get Bitts from RemoteServer");
        fetch("/get-all-bitts")
            .then(function(response) {
                // Process API response
                return response.text();
            })
            .then(function(text) {
                // save Bitts in LocalStorage
                localStorage.bitts = text;

                let container = document.getElementById("bittsContainer");
                let bitts = JSON.parse(text);

                for (let bitt of bitts) {
                    let bittElement = document.createElement("p");
                    bittElement.innerHTML = bitt.text + "<br> <small>" + bitt.username + "</small>";
                    container.appendChild(bittElement);
                }
            })
            .catch(function(error){
                // Process API error
                console.log("Request failed", error);
            });
    }
}())