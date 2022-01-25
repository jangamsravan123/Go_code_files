window.onload = function() {
	// var data = 345	
	// const url = 'http://localhost:8080/view'
	// async function getResponse() {
	// 	const response = await fetch(url);
	// 	const realData = await response.json();
		//realData = JSON.parse(realData["devices"])



	let socket = new WebSocket("ws://127.0.0.1:8080/view/device");
    console.log("Attempting Connection...");
    var data =30
    socket.onopen = () => {
        console.log("Successfully Connected");
        socket.send("Hi From the Client!")
        socket.send("this is awesome!!!!!!!!")
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
        socket.send("Client Closed!")
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };


	socket.onmessage = function (event) {
        
        console.log(event.data)
        //data = JSON.parse(event.data)
        //console.log(data)

		//console.log(event.data["devices"][0]);
		data = JSON.parse(event.data)
		data = data["devices"][0]
		console.log(data)

		var element = document.getElementById("hostname")
		element.value = data.HostName
		//element.disabled = true
		element.readOnly = true
		element = document.getElementById("modelno")
		element.value = data.ModelNo
		element.readOnly = true
		element = document.getElementById("serialno")
		element.value = data.SerialNo
		element.readOnly = true
		element = document.getElementById("uuid")
		element.value = data.UUID
		element.readOnly = true
		element = document.getElementById("wd-wan")
		element.value = data.Cs_Url
		element.readOnly = true
	}
	
	//getResponse();

}
