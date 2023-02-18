function testSpeed() {
    let startTime;
    let endTime;
    let fileSize = 5 * 1024 * 1024; // 5 MB
    let downloadSpeed;
    let uploadSpeed;

    // Test download speed
    fetch("https://speed.hetzner.de/1GB.bin")
        .then(response => {
            startTime = performance.now();
            return response.arrayBuffer();
        })
        .then(buffer => {
            endTime = performance.now();
            let duration = (endTime - startTime) / 1000; // seconds
            let bitsLoaded = fileSize * 8;
            downloadSpeed = (bitsLoaded / duration / 1000000).toFixed(2); // Mbps
            document.querySelector(".speed").innerHTML = `Download speed: ${downloadSpeed} Mbps`;
        })
        .catch(error => {
            document.querySelector(".error").innerHTML = `Error testing download speed: ${error.message}`;
        });

    // Test upload speed
    let formData = new FormData();
    formData.append("file", new Blob([new ArrayBuffer(fileSize)]));
    fetch("https://ptsv2.com/t/1c6j3-1645243705/post", { method: "POST", body: formData })
        .then(response => {
            startTime = performance.now();
            return response.json();
        })
        .then(json => {
            endTime = performance.now();
            let duration = (endTime - startTime) / 1000; // seconds
            let bitsLoaded = fileSize * 8;
            uploadSpeed = (bitsLoaded / duration / 1000000).toFixed(2); // Mbps
            document.querySelector(".speed").innerHTML += `<br>Upload speed: ${uploadSpeed} Mbps`;
        })
        .catch(error => {
            document.querySelector(".error").innerHTML = `Error testing upload speed: ${error.message}`;
        });
}