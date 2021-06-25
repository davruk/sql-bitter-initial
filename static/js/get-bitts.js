(function() {
    function getBitts(){
        console.log("GetBitts occuring every three minutes");

        // Get Bitts from LocalStorage
        let storredBittsRaw = localStorage.bitts;
        let lastBittid = null;
        let storredBitts = null;

        if(storredBittsRaw) {
            storredBitts = JSON.parse(storredBittsRaw);
            lastBittid = storredBitts[0].id;
        }
        fetch("/get-all-bitts?lastid="+lastBittid)
        .then(function(response){
            return response.text();
        })
        .then(function(text){
            console.log(text);
            let response = JSON.parse(text);

            if(response.synced){
                console.log("LocalStorage is inSync with ServerStorage");
            }
            else {
                localStorage.bitts = text;
                storedBitts = JSON.parse(text);
            }

            // Show Bitts in HTML
            let container = document.getElementById("bittsContainer");
            container.innerHTML = "";

            for (let bitt of storredBitts) {
                let bittElement = document.createElement("p");
                bittElement.innerHTML = bitt.text + "<br> <small>" + bitt.username + "</small>";
                container.appendChild(bittElement);
            }
        })
        .catch(function(error){
            console.log("API request failed", error);
        });
    }

    // Initial getBitts run
    getBitts();
    setInterval(getBitts,1000);
}())