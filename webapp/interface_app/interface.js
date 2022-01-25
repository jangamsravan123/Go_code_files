
var info = 30
var data = 50
var index = 0;
var gdata;
var ip4index = 0;
var ip6index = 0;
window.onload = function () {
    ip4index = 0;
    ip6index = 0;
    console.log("setup called")
    Setup();
    var socket = new WebSocket("ws://127.0.0.1:8080/view/interface");
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
        console.log(event.data);
        info = JSON.parse(event.data);
        console.log(info);
        var len = info.Interfaces.length;
        console.log(len)

        for (var i = 0; i < info.Interfaces.length; i++) {
            var element = document.getElementById(i.toString())
            element.style.display = "block"
            element.textContent = info.Interfaces[i].InterfaceName;
        }
        if (info.Interfaces.length >= 4) {
            document.getElementById("add-interface").style.display = "none";
        }
        console.log(info.Interfaces[0])
        data = info.Interfaces[0]
        waninfo(0)
    }

}

function arrangeColor(x) {
    for (var i = 0; i < 4; i++) {
        document.getElementById(i.toString()).style.backgroundColor = "";
        
    }
    if (x >= 4) {
        document.getElementById("add-interface").style.backgroundColor = "orange"
    } else {
        document.getElementById(x.toString()).style.backgroundColor = "orange"
        document.getElementById("add-interface").style.backgroundColor = ""
    }

}
function Setup() {
    for (var i = 0; i < 4; i++) {
        var element = document.getElementById(i.toString())
        element.style.display = "none"
    }
    //document.getElementById("0").style.backgroundColor = "orange";
    //document.getElementById("delete-lable").style.display ="none"
    //document.getElementById("delete-btn").style.display ="none"
    //document.getElementById("confirm").style.display = "none"
    enableDelete();
    //networkmode();
    //document.getElementById("table5").style.display = "none";
}





function SubmitData() {
    var socket = new WebSocket("ws://127.0.0.1:8080/save/interface");
    console.log("Attempting Connection...");
    var data = 30
    socket.onopen = () => {
        console.log("Successfully Connected");
        var array4 = []
        var array6 = []
        var x = 30
        console.log("ip4" + x.toString())

        for (var i = 0; i <= ip4index; i++) {
            console.log(ip4index)
            var IP = {
                Type: document.getElementById("type4-" + i.toString()).value,
                IP: document.getElementById("ip4-" + i.toString()).value,
                PrefixLength: document.getElementById("prefix-length4-" + i.toString()).value,
                GateWay: document.getElementById("gateway4-" + i.toString()).value,
                StaticNatIP: document.getElementById("static-nat-ip4-" + i.toString()).value,
                UserName: document.getElementById("username4-" + i.toString()).value,
                Password: document.getElementById("password4-" + i.toString()).value,
                DHCP: document.getElementById("dhcp4-" + i.toString()).value
            }
            array4[i] = IP;

        }

        for (var i = 0; i <= ip6index; i++) {
            console.log(ip6index)
            var IP = {
                Type: document.getElementById("type6-" + i.toString()).value,
                IP: document.getElementById("ip6-" + i.toString()).value,
                PrefixLength: document.getElementById("prefix-length6-" + i.toString()).value,
                GateWay: document.getElementById("gateway6-" + i.toString()).value,
                StaticNatIP: document.getElementById("static-nat-ip6-" + i.toString()).value,
                UserName: document.getElementById("username6-" + i.toString()).value,
                Password: document.getElementById("password6-" + i.toString()).value,
                DHCP: document.getElementById("dhcp6-" + i.toString()).value
            }
            array6[i] = IP;

        }


        var person = {
            InterfaceName: document.getElementById("interface-name").value,
            PortType: document.getElementById("port-type").value,
            AssociatedPort: document.getElementById("associated-port").value,
            Vlan: document.getElementById("vlan").value,
            DNS4: document.getElementById("dns4").value,
            DNS6: document.getElementById("dns6").value,
            MTU: document.getElementById("mtu").value,
            APN: document.getElementById("apn").value,
            CS: document.getElementById("cs").checked,
            PreferredController: document.getElementById("preferred-controller").checked,
            GateWay: document.getElementById("gateway").checked,
            EndPoint4: document.getElementById("end-point4").value,
            EndPoint6: document.getElementById("end-point6").value,
            LoopbackIP: document.getElementById("loopback-ip").value,
            LoopbackMask: document.getElementById("loopback-mask").value,
            MPLS: document.getElementById("mpls").checked,
            IPv4: array4,
            IPv6: array6,
            Speed: "",
            AutoNeg: "",
            Duplex: ""
        }
        var ele = document.getElementsByName("speed");
        for (var i = 0; i < ele.length; i++) {

            if (ele[i].type = "radio") {
                if (ele[i].checked == true) {
                    person.Speed = ele[i].value;
                }

            }
        }
        var ele = document.getElementsByName("auto-neg");
        for (var i = 0; i < ele.length; i++) {

            if (ele[i].type = "radio") {
                if (ele[i].checked == true) {
                    person.AutoNeg = ele[i].value;
                }

            }
        }
        var ele = document.getElementsByName("duplex");
        for (var i = 0; i < ele.length; i++) {

            if (ele[i].type = "radio") {
                if (ele[i].checked == true) {
                    person.Duplex = ele[i].value;
                }

            }
        }


        console.log(person)
        info.Interfaces[index] = person;

        socket.send(JSON.stringify(info))
    };
    socket.onmessage = function (event) {
        console.log(event.data)
        //alert(event.data)
        window.onload(true);
    }
}

function waninfo(x) {
    ip4index = 0
    ip6index = 0
    index = x;
    
    document.getElementById("description").style.display = "inline"
    //document.getElementById("confirm").style.display = "none"
    //document.getElementById("delete").style.display = "block"
    arrangeColor(x);
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
    document.getElementById("loopback-ip").value = data.LoopbackIP;
    document.getElementById("loopback-mask").value = data.LoopbackMask;
    document.getElementById("cs").checked = data.CS;
    document.getElementById("preferred-controller").checked = data.PreferredController;
    document.getElementById("gateway").checked = data.GateWay;
    document.getElementById("mpls").checked = data.MPLS;

    for (var i = 0; i < data.IPv4.length; i++) {
        if (i > 0) {
            AddIPv4();
        }

        document.getElementById("type4-" + i.toString()).value = data.IPv4[i].Type;
        document.getElementById("ip4-" + i.toString()).value = data.IPv4[i].IP;
        document.getElementById("prefix-length4-" + i.toString()).value = data.IPv4[i].PrefixLength;
        document.getElementById("gateway4-" + i.toString()).value = data.IPv4[i].GateWay;
        document.getElementById("static-nat-ip4-" + i.toString()).value = data.IPv4[i].StaticNatIP;
        document.getElementById("username4-" + i.toString()).value = data.IPv4[i].UserName;
        document.getElementById("password4-" + i.toString()).value = data.IPv4[i].Password;
        document.getElementById("dhcp4-" + i.toString()).value = data.IPv4[i].DHCP;
        networktype4(i);
    }
    for (var i = 0; i < data.IPv6.length; i++) {
        if (i > 0) {
            AddIPv6();
        }

        document.getElementById("type6-" + i.toString()).value = data.IPv6[i].Type;
        document.getElementById("ip6-" + i.toString()).value = data.IPv6[i].IP;
        document.getElementById("prefix-length6-" + i.toString()).value = data.IPv6[i].PrefixLength;
        document.getElementById("gateway6-" + i.toString()).value = data.IPv6[i].GateWay;
        document.getElementById("static-nat-ip6-" + i.toString()).value = data.IPv6[i].StaticNatIP;
        document.getElementById("username6-" + i.toString()).value = data.IPv6[i].UserName;
        document.getElementById("password6-" + i.toString()).value = data.IPv6[i].Password;
        document.getElementById("dhcp6-" + i.toString()).value = data.IPv6[i].DHCP;
        networktype6(i)
    }
    var ele = document.getElementsByName("speed");
    for (var i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {
            if (ele[i].value == data.Speed) {
                ele[i].checked = true;
            } else {
                ele[i].checked = false;
            }

        }
    }
    var ele = document.getElementsByName("auto-neg");
    for (var i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {
            if (ele[i].value == data.AutoNeg) {
                ele[i].checked = true;
            } else {
                ele[i].checked = false;
            }

        }
    }
    var ele = document.getElementsByName("duplex");
    for (var i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {
            if (ele[i].value == data.Duplex) {
                ele[i].checked = true;
            } else {
                ele[i].checked = false;
            }

        }
    }

    
    porttype();
    mplsOn();
    AutoNeg2(data.AutoNeg);
    //document.getElementById("delete-btn").style.display = "none";
    document.getElementById("delete-btn").disabled = true;
    document.getElementById("action").value ="";
    //AutoNegOn();
    //AutoNegOff()
    //ToggleAutoDNS();
    //AutoNeg();
    //networkmode();
}

function newinfo() {
    ip4index = 0
    ip6index = 0
    index = info.Interfaces.length;
    arrangeColor(4);
    document.getElementById("description").style.display = "none"
    //document.getElementById("delete").style.display = "block"

    console.log("waninfo")

    document.getElementById("vlan").value = "";
    document.getElementById("dns4").value = "";
    document.getElementById("dns6").value = "";
    document.getElementById("mtu").value ="";
    document.getElementById("apn").value = "";
    document.getElementById("end-point4").value ="";
    document.getElementById("end-point6").value ="";
    document.getElementById("interface-name").value ="";
    document.getElementById("port-type").value = "";
    document.getElementById("associated-port").value = "";
    document.getElementById("loopback-ip").value = "";
    document.getElementById("loopback-mask").value ="";
    document.getElementById("cs").checked = false;
    document.getElementById("preferred-controller").checked = false;
    document.getElementById("gateway").checked = false;
    document.getElementById("mpls").checked = false;

    var i = 0;
    document.getElementById("type4-" + i.toString()).value = "";
    document.getElementById("ip4-" + i.toString()).value ="";
    document.getElementById("prefix-length4-" + i.toString()).value = "";
    document.getElementById("gateway4-" + i.toString()).value = "";
    document.getElementById("static-nat-ip4-" + i.toString()).value ="";
    document.getElementById("username4-" + i.toString()).value = "";
    document.getElementById("password4-" + i.toString()).value = "";
    document.getElementById("dhcp4-" + i.toString()).value = "";
    networktype4(i);
    i = 0;

    document.getElementById("type6-" + i.toString()).value = "";
    document.getElementById("ip6-" + i.toString()).value = "";
    document.getElementById("prefix-length6-" + i.toString()).value = "";
    document.getElementById("gateway6-" + i.toString()).value = "";
    document.getElementById("static-nat-ip6-" + i.toString()).value = "";
    document.getElementById("username6-" + i.toString()).value = "";
    document.getElementById("password6-" + i.toString()).value = "";
    document.getElementById("dhcp6-" + i.toString()).value = "";
    networktype6(i)

    var ele = document.getElementsByName("speed");
    for (var i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {

            ele[i].checked = false;
        }
    }
    var ele = document.getElementsByName("auto-neg");
    for (var i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {
            ele[i].checked = false;
        }
    }
    var ele = document.getElementsByName("duplex");
    for (var i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {
            ele[i].checked = false;
        }
    }

   
    //document.getElementById("delete-btn").style.display = "none";
    document.getElementById("delete-btn").disabled = true;
    document.getElementById("action").value ="";
    porttype();
    mplsOn();
    //ToggleAutoDNS();
    //AutoNeg();
    //networkmode();
}


function networktype6(x) {
    var val = document.getElementById("type6-" + x.toString()).value;
    if (val == "DHCP") {
        document.getElementById("username6-option-" + x.toString()).style.display = "none"
        document.getElementById("password6-option-" + x.toString()).style.display = "none"
        document.getElementById("gateway6-option-" + x.toString()).style.display = "none"

        document.getElementById("prefix-length6-option-" + x.toString()).style.display = "none"
        document.getElementById("ip6-option-" + x.toString()).style.display = "none"
        document.getElementById("dhcp6-option-" + x.toString()).style.display = "block"
        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display = "none"
    }
    else if (val == "PPoE") {
        document.getElementById("username6-option-" + x.toString()).style.display = "block"
        document.getElementById("password6-option-" + x.toString()).style.display = "block"
        document.getElementById("gateway6-option-" + x.toString()).style.display = "none"
        document.getElementById("dhcp6-option-" + x.toString()).style.display = "none"
        document.getElementById("prefix-length6-option-" + x.toString()).style.display = "none"
        document.getElementById("ip6-option-" + x.toString()).style.display = "none"

        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display = "none"

    }
    else if (val == "SLAAC") {
        document.getElementById("username6-option-" + x.toString()).style.display = "none"
        document.getElementById("password6-option-" + x.toString()).style.display = "none"
        document.getElementById("gateway6-option-" + x.toString()).style.display = "none"
        document.getElementById("dhcp6-option-" + x.toString()).style.display = "none"
        document.getElementById("prefix-length6-option-" + x.toString()).style.display = "none"
        document.getElementById("ip6-option-" + x.toString()).style.display = "none"

        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display = "none"
    }
    else {
        document.getElementById("username6-option-" + x.toString()).style.display = "none"
        document.getElementById("password6-option-" + x.toString()).style.display = "none"
        document.getElementById("gateway6-option-" + x.toString()).style.display = "block"
        document.getElementById("dhcp6-option-" + x.toString()).style.display = "none"
        document.getElementById("prefix-length6-option-" + x.toString()).style.display = "block"
        document.getElementById("ip6-option-" + x.toString()).style.display = "block"

        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display = "block"
    }

}

function networktype4(x) {
    var val = document.getElementById("type4-" + x.toString()).value;
    if (val == "DHCP") {
        document.getElementById("username4-option-" + x.toString()).style.display = "none"
        document.getElementById("password4-option-" + x.toString()).style.display = "none"
        document.getElementById("gateway4-option-" + x.toString()).style.display = "none"

        document.getElementById("prefix-length4-option-" + x.toString()).style.display = "none"
        document.getElementById("ip4-option-" + x.toString()).style.display = "none"
        document.getElementById("dhcp4-option-" + x.toString()).style.display = "block"
        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display = "none"
    }
    else if (val == "PPoE") {
        document.getElementById("username4-option-" + x.toString()).style.display = "block"
        document.getElementById("password4-option-" + x.toString()).style.display = "block"
        document.getElementById("gateway4-option-" + x.toString()).style.display = "none"
        document.getElementById("dhcp4-option-" + x.toString()).style.display = "none"
        document.getElementById("prefix-length4-option-" + x.toString()).style.display = "none"
        document.getElementById("ip4-option-" + x.toString()).style.display = "none"

        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display = "none"

    }
    else if (val == "SLAAC") {
        document.getElementById("username4-option-" + x.toString()).style.display = "none"
        document.getElementById("password4-option-" + x.toString()).style.display = "none"
        document.getElementById("gateway4-option-" + x.toString()).style.display = "none"
        document.getElementById("dhcp4-option-" + x.toString()).style.display = "none"
        document.getElementById("prefix-length4-option-" + x.toString()).style.display = "none"
        document.getElementById("ip4-option-" + x.toString()).style.display = "none"

        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display = "none"
    }
    else {
        document.getElementById("username4-option-" + x.toString()).style.display = "none"
        document.getElementById("password4-option-" + x.toString()).style.display = "none"
        document.getElementById("gateway4-option-" + x.toString()).style.display = "block"
        document.getElementById("dhcp4-option-" + x.toString()).style.display = "none"
        document.getElementById("prefix-length4-option-" + x.toString()).style.display = "block"
        document.getElementById("ip4-option-" + x.toString()).style.display = "block"

        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display = "block"
    }

}


function AutoNeg2(x) {
    var ele = document.getElementsByName("auto-neg")
    if (x == "on") {
        document.getElementById("auto-neg-speed-option").style.display = "none";
        document.getElementById("auto-neg-duplex-option").style.display = "none";
    } else {
        document.getElementById("auto-neg-speed-option").style.display = "block";
        document.getElementById("auto-neg-duplex-option").style.display = "block";
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

function mplsOn() {
    var ele = document.getElementById("mpls")
    if (ele.checked) {
        document.getElementById("loopback-option1").style.display = "none"
        document.getElementById("loopback-mask-option").style.display = "none"
    } else {
        var v = document.getElementById("port-type").value;
         if (v == "USB 3G/4G" || v == "Onboard 4G") {
            document.getElementById("loopback-option1").style.display = "none"
            document.getElementById("loopback-mask-option").style.display = "none"
         } else {
         document.getElementById("loopback-option1").style.display = "block"
         document.getElementById("loopback-mask-option").style.display = "block"
         }
    }
}


function porttype() {
    var v = document.getElementById("port-type").value;
    if (v == "USB 3G/4G" || v == "Onboard 4G") {
        document.getElementById("table3").style.display = "none";
        document.getElementById("loopback-option1").style.display = "none";
        document.getElementById("loopback-mask-option").style.display = "none";
        document.getElementById("mpls-option").style.display = "none";
        document.getElementById("apn-option").style.display = "block";

    } else {
        document.getElementById("table3").style.display = "block";
        document.getElementById("loopback-option1").style.display = "block";
        document.getElementById("loopback-mask-option").style.display = "block";
        document.getElementById("mpls-option").style.display = "block";
        document.getElementById("apn-option").style.display = "none";
    }

}

function checkDelete() {
    console.log("sravan")
    document.getElementById("confirm").style.display = "block"
    document.getElementById("delete").style.display = "none"

}

function enableDelete() {
    console.log("sravan")
    var val = document.getElementById("action").value
    console.log(val)
    if (val == "delete") {
        //document.getElementById("delete-btn").style.display = "inline";
        document.getElementById("delete-btn").disabled = false;
        
    } else {
        //document.getElementById("delete-btn").style.display = "none";
        document.getElementById("delete-btn").disabled = true;
    }
}

function deleteInterface() {
    info.Interfaces.splice(index, 1)
     var val = document.getElementById("action").value;
     console.log(val)
    if (val == "delete" ||  val == "DELETE"){
        console.log("sravan")
        
       
    } else {
        return
    }
    var socket = new WebSocket("ws://127.0.0.1:8080/delete/interface");
    console.log("Attempting Connection...");
    socket.onopen = () => {
        console.log("Successfully Connected");
        //socket.send("Hi From the Client!")
        socket.send(JSON.stringify(info));
    };
    socket.onmessage = function (event) {
        console.log(event.data)
        //alert(event.data)
        window.onload(true);
    }

}

