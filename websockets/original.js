var person = {
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
var info = 30
var data =50
var index = 0;
window.onload = function() {
    var socket = new WebSocket("ws://127.0.0.1:8080/ws/view");
    console.log("Attempting Connection...");
     data =30
    socket.onopen = () => {
        console.log("Successfully Connected");
        //socket.send("Hi From the Client!")
        //socket.send(person)
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
        info = JSON.parse(event.data)
        console.log(info)
        var len = info.Interfaces.length;
        console.log(len)
        for( var i=0;i<4;i++)
        {
            var element = document.getElementById(i.toString())
            element.style.display = "none"
        }
        for( var i=0;i<len;i++)
        {
            var element = document.getElementById(i.toString())
            element.style.display = "block"
            element.textContent =info.Interfaces[i].InterfaceName;
        }
        console.log(info.Interfaces[0])
        data = info.Interfaces[0]
        waninfo(0)
    /*
        document.getElementById("vlan").value = data.Vlan;
        document.getElementById("dns").value = data.DNS;
        document.getElementById("mtu").value = data.MTU;
        document.getElementById("end-point").value = data.EndPoint;
        document.getElementById("interface-name").value = data.InterfaceName;
        document.getElementById("port-type").value=data.PortType;
        document.getElementById("associated-port").value = data.AssociatedPort;
        document.getElementById("network-mode").value = data.NetworkMode;
        document.getElementById("type").value = data.Type;
        document.getElementById("auto-neg").value = data.AutoNeg;
        document.getElementById("speed").value = data.Speed;
        document.getElementById("duplex").value = data.Duplex;

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

        ToggleAutoDNS();
        AutoNeg(); */
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
    var v = element.value;
    if (v == "on") {
        document.getElementById("speed").disabled = true;
        document.getElementById("duplex").disabled = true;
    } else {
        document.getElementById("speed").disabled = false;
        document.getElementById("duplex").disabled = false;
    }
}

function check() {
    var element = document.getElementById("checkbox")
    if (element.checked == true) {
        document.getElementById("check-data").textContent = "Checked";
    } else {
        document.getElementById("check-data").textContent = "unchecked";
    }
}

function SubmitData() {
    var socket = new WebSocket("ws://127.0.0.1:8080/ws/save");
    console.log("Attempting Connection...");
    var data =30
    socket.onopen = () => {
        console.log("Successfully Connected");
    
         var person = {
            InterfaceName : "Lan0",
            PortType : "Ethernet",
            AssociatedPort : "eth1",
            Vlan : document.getElementById("vlan").value,
            NetworkMode : "IPv4 Only",
            Type : "DHCP",
            IgnoreAutoDNS : "true",
            DNS : document.getElementById("dns").value,
            MTU : document.getElementById("mtu").value,
            AutoNeg : "on",
            Speed : "30s",
            Duplex : "any value",
            CS : "false",
            PrefferedController : "true",
            GateWay : "true",
            EndPoint : document.getElementById("end-point").value
        }
        var element = document.getElementById("interface-name");
        person.InterfaceName = element.value;
        person.PortType = document.getElementById("port-type").value;
        person.AssociatedPort = document.getElementById("associated-port").value;
        person.NetworkMode = document.getElementById("network-mode").value;
        person.Type= document.getElementById("type").value;
        person.AutoNeg = document.getElementById("auto-neg").value;
        person.Speed = document.getElementById("speed").value;
        person.Duplex = document.getElementById("duplex").value;
        console.log(person)
        info.Interfaces[index]=person;
        socket.send(JSON.stringify(info))
    };
        
    

    
}

function waninfo(x) {
    index =x
    data = info.Interfaces[x]
    console.log("waninfo")
    console.log(data)
    
        document.getElementById("vlan").value = data.Vlan;
        document.getElementById("dns").value = data.DNS;
        document.getElementById("mtu").value = data.MTU;
        document.getElementById("end-point").value = data.EndPoint;
        document.getElementById("interface-name").value = data.InterfaceName;
        document.getElementById("port-type").value=data.PortType;
        document.getElementById("associated-port").value = data.AssociatedPort;
        document.getElementById("network-mode").value = data.NetworkMode;
        document.getElementById("type").value = data.Type;
        document.getElementById("auto-neg").value = data.AutoNeg;
        document.getElementById("speed").value = data.Speed;
        document.getElementById("duplex").value = data.Duplex;

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

        ToggleAutoDNS();
        AutoNeg();
}

