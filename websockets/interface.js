
var info = 30
var data = 50
var index = 0;
var gdata;
var ip4index =0;
var ip6index =0;
window.onload = function () {
    ip4index =0;
    ip6index=0;
    console.log("setup called")
    //Setup();
    var socket = new WebSocket("ws://127.0.0.1:8080/ws/view");
    console.log("Attempting Connection...");
    data = 30
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
        index = 0;
        console.log(event)
        console.log(event.data)
        gdata = event;
        if (event.data == "") {
            alert("No Interface is there");
            return
        }
        info = JSON.parse(event.data)
        console.log(info)
        var len = info.Interfaces.length;
        console.log(len)

        for (var i = 0; i < info.Interfaces.length; i++) {
            var element = document.getElementById(i.toString())
            element.style.display = "block"
            element.textContent = info.Interfaces[i].InterfaceName;
        }
        console.log(info.Interfaces[0])
        data = info.Interfaces[0]
        waninfo(0)
    }

}

function Setup() {
    for (var i = 0; i < 6; i++) {
        var element = document.getElementById(i.toString())
        element.style.display = "none"
    }
    networkmode();
    document.getElementById("table5").style.display = "none";
}

function porttype() {
    var v = document.getElementById("port-type").value;
    if (v == "USB 3G/4G" || v == "Onboard 4G") {
        document.getElementById("table2").style.display = "none";
        document.getElementById("table3").style.display = "none";
        document.getElementById("table4").style.display = "none";
        document.getElementById("table5").style.display = "block";
    } else {
        document.getElementById("table2").style.display = "block";
        document.getElementById("table3").style.display = "block";
        document.getElementById("table4").style.display = "block";
        document.getElementById("table5").style.display = "none";
    }

}

function networkmode() {
    var v = document.getElementById("network-mode").value
    console.log(v)
    if (v == "IPv4") {
        document.getElementById("ip4-config").style.display = "block";
        document.getElementById("ip6-config").style.display = "none";
        document.getElementById("dns4-option").style.display = "block";
        document.getElementById("dns6-option").style.display = "none";
        document.getElementById("end-point4-option").style.display = "block";
        document.getElementById("end-point6-option").style.display = "none";
    }
    else if (v == "IPv6") {
        document.getElementById("ip4-config").style.display = "none";
        document.getElementById("ip6-config").style.display = "block";
        document.getElementById("dns4-option").style.display = "none";
        document.getElementById("dns6-option").style.display = "block";
        document.getElementById("end-point4-option").style.display = "none";
        document.getElementById("end-point6-option").style.display = "block";
    } else if (v == "Dual") {
        document.getElementById("ip4-config").style.display = "block";
        document.getElementById("ip6-config").style.display = "block";
        document.getElementById("dns4-option").style.display = "block";
        document.getElementById("dns6-option").style.display = "block";
        document.getElementById("end-point4-option").style.display = "block";
        document.getElementById("end-point6-option").style.display = "block";
    } else {
        document.getElementById("ip4-config").style.display = "none";
        document.getElementById("ip6-config").style.display = "none";
        document.getElementById("dns4-option").style.display = "block";
        document.getElementById("dns6-option").style.display = "none";
        document.getElementById("end-point6-option").style.display = "none";
    }
}

function ToggleAutoDNS() {
    var element = document.getElementById("auto-dns");
    if (element.checked == false) {
        document.getElementById("dns4-option").style.display = "none"
        document.getElementById("dns6-option").style.display = "none"
    } else {
        document.getElementById("dns4-option").style.display = "inline"
        document.getElementById("dns6-option").style.display = "inline"
    }
}

function AutoNeg() {
    var v = document.getElementById("auto-neg").value;
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
    var data = 30
    socket.onopen = () => {
        console.log("Successfully Connected");
        var array4 = []
        var array6 = []
        var x=30
        console.log("ip4"+ x.toString())
        
        for (var i=0;i<=ip4index;i++) {
            var IP = {
                IP : document.getElementById("ip4-"+i.toString()).value,
                PrefixLength : document.getElementById("prefix-length4-"+i.toString()).value,
                Gateway : document.getElementById("gateway4-"+i.toString()).value,
                static_ip : document.getElementById("static-nat-ip4-"+i.toString()).value
            }
            array4[i]=IP;

        }

        for (var i=0;i<=ip6index;i++) {
            var IP = {
                IP : document.getElementById("ip6-"+i.toString()).value,
                PrefixLength : document.getElementById("prefix-length6-"+i.toString()).value,
                Gateway : document.getElementById("gateway6-"+i.toString()).value,
                static_ip : document.getElementById("static-nat-ip6-"+i.toString()).value
            }
            array6[i]=IP;

        }


        var person = {
            InterfaceName: document.getElementById("interface-name").value,
            PortType: document.getElementById("port-type").value,
            AssociatedPort: document.getElementById("associated-port").value,
            Vlan: document.getElementById("vlan").value,
            NetworkMode: document.getElementById("network-mode").value,
            Type: document.getElementById("type").value,
            IgnoreAutoDNS: document.getElementById("auto-dns").checked,
            DNS4: document.getElementById("dns4").value,
            DNS6: document.getElementById("dns6").value,
            MTU: document.getElementById("mtu").value,
            APN: document.getElementById("apn").value,
            AutoNeg: document.getElementById("auto-neg").value,
            Speed: document.getElementById("speed").value,
            Duplex: document.getElementById("duplex").value,
            CS: document.getElementById("cs").checked,
            PreferredController: document.getElementById("preferred-controller").checked,
            GateWay: document.getElementById("gateway").checked,
            EndPoint4: document.getElementById("end-point4").value,
            EndPoint6: document.getElementById("end-point6").value,
            LoopbackIP: document.getElementById("loopback-ip").value,
            LoopbackMask: document.getElementById("loopback-mask").value,
            MPLS: document.getElementById("mpls").checked,
            IPv4 : array4,
            IPv6 : array6
            /*IP4: document.getElementById("ip4").value,
            PrefixLength4: document.getElementById("prefix-length4").value,
            GateWay4: document.getElementById("gateway4").value,
            StaticNatIP4: document.getElementById("static-nat-ip4").value,
            IP6: document.getElementById("ip4").value,
            PrefixLength6: document.getElementById("prefix-length6").value,
            GateWay6: document.getElementById("gateway6").value,
            StaticNatIP6: document.getElementById("static-nat-ip6").value,*/
        }
       

        console.log(person)
        info.Interfaces[index] = person;
        socket.send(JSON.stringify(info))
    };
    socket.onmessage = function (event) {
        console.log(event.data)
        alert(event.data)
        window.onload(true);
    }
}

function waninfo(x) {
    index = x;
    data = info.Interfaces[x]
    console.log("waninfo")
    console.log(data)

    document.getElementById("vlan").value = data.Vlan;
    document.getElementById("dns4").value = data.DNS4;
    document.getElementById("dns6").value = data.DNS6;
    document.getElementById("mtu").value = data.MTU;
    document.getElementById("apn").value = data.APN;
    document.getElementById("end-point4").value = data.EndPoint4;
    document.getElementById("end-point6").value = data.EndPoint6;
    document.getElementById("interface-name").value = data.InterfaceName;
    document.getElementById("port-type").value = data.PortType;
    document.getElementById("associated-port").value = data.AssociatedPort;
    document.getElementById("network-mode").value = data.NetworkMode;
    document.getElementById("type").value = data.Type;
    document.getElementById("auto-neg").value = data.AutoNeg;
    document.getElementById("speed").value = data.Speed;
    document.getElementById("duplex").value = data.Duplex;
    document.getElementById("loopback-ip").value = data.LoopbackIP;
    document.getElementById("loopback-mask").value = data.LoopbackMask;
    document.getElementById("ip4").value = data.IP4;
    document.getElementById("ip6").value = data.IP6;
    document.getElementById("prefix-length4").value = data.PrefixLength4;
    document.getElementById("prefix-length6").value = data.PrefixLength6;
    document.getElementById("gateway4").value = data.GateWay4;
    document.getElementById("gateway6").value = data.GateWay6;
    document.getElementById("static-nat-ip4").value = data.StaticNatIP4;
    document.getElementById("static-nat-ip6").value = data.StaticNatIP6;
    document.getElementById("auto-dns").checked = data.IgnoreAutoDNS;
    document.getElementById("cs").checked = data.CS;
    document.getElementById("preferred-controller").checked = data.PreferredController;
    document.getElementById("gateway").checked = data.GateWay;
    document.getElementById("mpls").checked = data.MPLS;

    ToggleAutoDNS();
    AutoNeg();
    networkmode();
}

function AddIPv4() {
    ip4index++;
    console.log("sravan")
    var element = document.getElementById("ip4-config")
    var table = document.createElement('table');
    var tr= document.createElement('tr');
    
    var td1 = document.createElement('td');
    var text = document.createTextNode('IP');
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    input.id = "ip4-"+ip4index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    td1 = document.createElement('td');
    text = document.createTextNode('Prefix-length');
    label = document.createElement('lable');
    label.appendChild(text)
    input = document.createElement("input");
    input.type = "text";
    input.id = "prefix-length4-"+ip4index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    td1 = document.createElement('td');
    text = document.createTextNode('gateway');
    label = document.createElement('lable');
    label.appendChild(text)
    input = document.createElement("input");
    input.type = "text";
    input.id = "gateway4-"+ip4index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    td1 = document.createElement('td');
    text = document.createTextNode("Static Nat IP");
    label = document.createElement('lable');
    label.appendChild(text)
    input = document.createElement("input");
    input.type = "text";
    input.id = "static-nat-ip4-"+ip4index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    
    
    table.appendChild(tr);
    console.log(tr)
    element.appendChild(table);  
}

function AddIPv6() {
    ip6index++;
    console.log("sravan")
    var element = document.getElementById("ip6-config")
    var table = document.createElement('table');
    var tr= document.createElement('tr');
    
    var td1 = document.createElement('td');
    var text = document.createTextNode('IP');
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    input.id = "ip6-"+ip6index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    td1 = document.createElement('td');
    text = document.createTextNode('Prefix-length');
    label = document.createElement('lable');
    label.appendChild(text)
    input = document.createElement("input");
    input.type = "text";
    input.id = "prefix-length6-"+ip6index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    td1 = document.createElement('td');
    text = document.createTextNode('gateway');
    label = document.createElement('lable');
    label.appendChild(text)
    input = document.createElement("input");
    input.type = "text";
    input.id = "gateway6-"+ip6index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    td1 = document.createElement('td');
    text = document.createTextNode("Static Nat IP");
    label = document.createElement('lable');
    label.appendChild(text)
    input = document.createElement("input");
    input.type = "text";
    input.id = "static-nat-ip6-"+ip6index.toString();
    td1.appendChild(label)
    td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    
    
    table.appendChild(tr);
    console.log(tr)
    element.appendChild(table);  
}

