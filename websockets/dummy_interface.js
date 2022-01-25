/*var person = {
    InterfaceName : "wan0",
    PortType : "Ethernet",
    AssociatedPort : "eth1",
    Vlan : "172.168.1.105",
    NetworkMode : "IPv4 Only",
    Type : "DHCP",
    IgnoreAutoDNS : "true",
    DNS : "168.1.104.7",
    MTU : "123445",
    AutoNeg : "on",
    Speed : "30s",
    Duplex : "any value",
    CS : "false",
    PrefferedController : "true",
    GateWay : "true",
    EndPoint : "8.8.5.20"
}
*/

function check() {
    var element = document.getElementById("checkbox")
    if (element.checked == true) {
        document.getElementById("check-data").textContent = "Checked";
    } else {
        document.getElementById("check-data").textContent = "unchecked";
    }
}

window.onload = function() {
    let socket = new WebSocket("ws://127.0.0.1:8080/ws/view");
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
         data = JSON.parse(event.data)
         console.log(data)
    
       
    
    document.getElementById("vlan").value = data.Vlan;
    document.getElementById("dns").value = data.DNS;
    document.getElementById("mtu").value = data.MTU;
    document.getElementById("end-point").value = data.EndPoint;

    var element = document.getElementById("interface-name");
    element.options[0].textContent =data.InterfaceName;

    element = document.getElementById("port-type");
    element.options[0].textContent =data.PortType;

    element = document.getElementById("associated-port");
    element.options[0].textContent =data.AssociatedPort;

    element = document.getElementById("network-mode");
    element.options[0].textContent =data.NetworkMode;

    element = document.getElementById("type");
    element.options[0].textContent =data.Type;

    element = document.getElementById("auto-neg");
    element.options[0].textContent =data.AutoNeg;

    element = document.getElementById("speed");
    element.options[0].textContent =data.Speed;

    element = document.getElementById("duplex");
    element.options[0].textContent =data.Duplex;

    if (data.IgnoreAutoDNS == "true") {
        document.getElementById("auto-dns").checked = true;
    }

    if (data.CS == "true") {
        document.getElementById("cs").checked = true;
    }

    if (data.PrefferedController == "true") {
        document.getElementById("preferred-controller").checked = true;
    }

    if (data.GateWay == "true") {
        document.getElementById("gateway").checked = true;
    }
}

}

function ToggleAutoDNS() {
    var element = document.getElementById("auto-dns");
    if (element.checked == false) {
        document.getElementById("dns-option").style.display = "none"
    } else {
        document.getElementById("dns-option").style.display = "inline"
    }
}

function AutoNeg() {
    var element = document.getElementById("auto-neg");
    var v = element[element.selectedIndex].text;
    
    if (v == "on") {
        document.getElementById("auto-neg-on").disabled = true;
    } else {
        document.getElementById("auto-neg-on").disabled = false;
    }

}