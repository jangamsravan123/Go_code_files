
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
        if(info.Interfaces.length>=4)
        {
            document.getElementById("add-interface").style.display= "none";
        }
        console.log(info.Interfaces[0])
        data = info.Interfaces[0]
        waninfo(0)
    }

}

function arrangeColor(x) {
    for (var i=0;i<4;i++) {
        document.getElementById(i.toString()).style.backgroundColor = "";
    }
    document.getElementById(x.toString()).style.backgroundColor = "orange"
    
}
function Setup() {
    for (var i = 0; i < 4; i++) {
        var element = document.getElementById(i.toString())
        element.style.display = "none"
    }
    document.getElementById("0").style.backgroundColor = "orange";
    //document.getElementById("delete-lable").style.display ="none"
    //document.getElementById("delete-btn").style.display ="none"
    document.getElementById("confirm").style.display ="none"
    
    //networkmode();
    //document.getElementById("table5").style.display = "none";
}





function SubmitData() {
    var socket = new WebSocket("ws://127.0.0.1:8080/ws/save");
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
                UserName : document.getElementById("username4-" + i.toString()).value,
                Password : document.getElementById("password4-" + i.toString()).value,
                DHCP : document.getElementById("dhcp4-" + i.toString()).value
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
                UserName : document.getElementById("username6-" + i.toString()).value,
                Password : document.getElementById("password6-" + i.toString()).value,
                DHCP : document.getElementById("dhcp6-" + i.toString()).value
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
            IPv6: array6
        
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
    ip4index=0
    ip6index=0
    index = x;
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

    for (var i = 0; i <data.IPv4.length; i++) {
            if(i>0)
            {
                AddIPv4();
            }
        
                document.getElementById("type4-" + i.toString()).value= data.IPv4[i].Type;
                document.getElementById("ip4-" + i.toString()).value =data.IPv4[i].IP;
                document.getElementById("prefix-length4-" + i.toString()).value =data.IPv4[i].PrefixLength;
                document.getElementById("gateway4-" + i.toString()).value=data.IPv4[i].GateWay;
                document.getElementById("static-nat-ip4-" + i.toString()).value =data.IPv4[i].StaticNatIP;
                document.getElementById("username4-" + i.toString()).value=data.IPv4[i].UserName;
                document.getElementById("password4-" + i.toString()).value = data.IPv4[i].Password;
                document.getElementById("dhcp4-" + i.toString()).value = data.IPv4[i].DHCP;
                networktype4(i);
            }
            for (var i = 0; i <data.IPv6.length; i++) {
                if(i>0)
                {
                    AddIPv6();
                }
            
                    document.getElementById("type6-" + i.toString()).value= data.IPv6[i].Type;
                    document.getElementById("ip6-" + i.toString()).value =data.IPv6[i].IP;
                    document.getElementById("prefix-length6-" + i.toString()).value =data.IPv6[i].PrefixLength;
                    document.getElementById("gateway6-" + i.toString()).value=data.IPv6[i].GateWay;
                    document.getElementById("static-nat-ip6-" + i.toString()).value =data.IPv6[i].StaticNatIP;
                    document.getElementById("username6-" + i.toString()).value=data.IPv6[i].UserName;
                    document.getElementById("password6-" + i.toString()).value = data.IPv6[i].Password;
                    document.getElementById("dhcp6-" + i.toString()).value = data.IPv6[i].DHCP;
                    networktype6(i)
                }

                porttype();
    //ToggleAutoDNS();
    //AutoNeg();
    //networkmode();
}


function networktype6(x) {
    var val = document.getElementById("type6-"+ x.toString()).value;
    if (val == "DHCP"){
        document.getElementById("username6-option-" + x.toString()).style.display ="none"
        document.getElementById("password6-option-" + x.toString()).style.display ="none"
        document.getElementById("gateway6-option-" + x.toString()).style.display ="none"
       
        document.getElementById("prefix-length6-option-" + x.toString()).style.display ="none"
        document.getElementById("ip6-option-" + x.toString()).style.display ="none"
        document.getElementById("dhcp6-option-" + x.toString()).style.display ="block"
        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display ="none"   
    } 
    else if (val == "PPoE") {
        document.getElementById("username6-option-" + x.toString()).style.display ="block"
        document.getElementById("password6-option-" + x.toString()).style.display ="block"
        document.getElementById("gateway6-option-" + x.toString()).style.display ="none"
        document.getElementById("dhcp6-option-" + x.toString()).style.display ="none"
        document.getElementById("prefix-length6-option-" + x.toString()).style.display ="none"
        document.getElementById("ip6-option-" + x.toString()).style.display ="none"
       
        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display ="none" 

    }
     else if (val == "SLAAC") {
        document.getElementById("username6-option-" + x.toString()).style.display ="none"
        document.getElementById("password6-option-" + x.toString()).style.display ="none"
        document.getElementById("gateway6-option-" + x.toString()).style.display ="none"
        document.getElementById("dhcp6-option-" + x.toString()).style.display ="none"
        document.getElementById("prefix-length6-option-" + x.toString()).style.display ="none"
        document.getElementById("ip6-option-" + x.toString()).style.display ="none"
       
        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display ="none" 
     }
     else {
        document.getElementById("username6-option-" + x.toString()).style.display ="none"
        document.getElementById("password6-option-" + x.toString()).style.display ="none"
        document.getElementById("gateway6-option-" + x.toString()).style.display ="block"
        document.getElementById("dhcp6-option-" + x.toString()).style.display ="none"
        document.getElementById("prefix-length6-option-" + x.toString()).style.display ="block"
        document.getElementById("ip6-option-" + x.toString()).style.display ="block"
       
        document.getElementById("static-nat-ip6-option-" + x.toString()).style.display ="block" 
     }

}

function networktype4(x) {
    var val = document.getElementById("type4-"+ x.toString()).value;
    if (val == "DHCP"){
        document.getElementById("username4-option-" + x.toString()).style.display ="none"
        document.getElementById("password4-option-" + x.toString()).style.display ="none"
        document.getElementById("gateway4-option-" + x.toString()).style.display ="none"
       
        document.getElementById("prefix-length4-option-" + x.toString()).style.display ="none"
        document.getElementById("ip4-option-" + x.toString()).style.display ="none"
        document.getElementById("dhcp4-option-" + x.toString()).style.display ="block"
        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display ="none"   
    } 
    else if (val == "PPoE") {
        document.getElementById("username4-option-" + x.toString()).style.display ="block"
        document.getElementById("password4-option-" + x.toString()).style.display ="block"
        document.getElementById("gateway4-option-" + x.toString()).style.display ="none"
        document.getElementById("dhcp4-option-" + x.toString()).style.display ="none"
        document.getElementById("prefix-length4-option-" + x.toString()).style.display ="none"
        document.getElementById("ip4-option-" + x.toString()).style.display ="none"
       
        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display ="none" 

    }
     else if (val == "SLAAC") {
        document.getElementById("username4-option-" + x.toString()).style.display ="none"
        document.getElementById("password4-option-" + x.toString()).style.display ="none"
        document.getElementById("gateway4-option-" + x.toString()).style.display ="none"
        document.getElementById("dhcp4-option-" + x.toString()).style.display ="none"
        document.getElementById("prefix-length4-option-" + x.toString()).style.display ="none"
        document.getElementById("ip4-option-" + x.toString()).style.display ="none"
       
        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display ="none" 
     }
     else {
        document.getElementById("username4-option-" + x.toString()).style.display ="none"
        document.getElementById("password4-option-" + x.toString()).style.display ="none"
        document.getElementById("gateway4-option-" + x.toString()).style.display ="block"
        document.getElementById("dhcp4-option-" + x.toString()).style.display ="none"
        document.getElementById("prefix-length4-option-" + x.toString()).style.display ="block"
        document.getElementById("ip4-option-" + x.toString()).style.display ="block"
       
        document.getElementById("static-nat-ip4-option-" + x.toString()).style.display ="block" 
     }

}




function AutoNegOff() {
    //var val = document.getElementById("off").checked
    console.log(document.getElementById("off").value)
    if(document.getElementById("off").checked = true){
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


function AutoNegOn() {
    //var val = document.getElementById("on").checked
    console.log(document.getElementById("on").value)
    if(document.getElementById("on").checked = true){
        document.getElementById("auto-neg-speed-option").style.display = "none";
        document.getElementById("auto-neg-duplex-option").style.display = "none";
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


function DeleteData(){
    var flag = false
    var val = document.getElementById("checkbox").checked
    // if(document.getElementById("delete")) {
    //     document.getElementById("description").style.display = "block";
    //     val = document.getElementById("checkbox").checked
    // }
       
    console.log(val.checked)
    
    if(val) {
        flag = true
    }
    if(flag){

    } else {
        alert("Please click the checkbox to delete");
    }
   
    
    
}

function checkDelete() {
    console.log("sravan")
   document.getElementById("confirm").style.display ="block"
   document.getElementById("delete").style.display ="none"

}



var wan_info = {
    InterfaceName: document.getElementById("interface-name").value,
    PortType : document.getElementById("port-type").value,
    AssociatedPort : document.getElementById("associated-port").value,
    Vlan : document.getElementById("vlan").value,
    MTU : document.getElementById("mtu").value,
    AutoNegOn : document.getElementById("on").value,
    AutoNegOff : document.getElementById("off").value,
    Speed50 : document.getElementById("speed50").value,
    Spedd100 : document.getElementById("speed100").value,
    Duplex : document.getElementById("duplex").value,
    HalfDuplex : document.getElementById("halfduplex").value,
    LoopbackIP : document.getElementById("loopback-ip").value,
    LoopbackMask: document.getElementById("loopback-mask").value,
    APN : document.getElementById("apn").value,
    MPLS : document.getElementById("mpls").checked,
    DNS4 : document.getElementById("dns4").value,
    DNS6 : document.getElementById("dns6").value,

    NetworkType4 : document.getElementById("type4-0").value,
    IP4 : document.getElementById("ip-4").value,
    UserName4 : document.getElementById("username4-0").value,
    PrefixLength4 : document.getElementById("prefix-length4-0").value,
    Password4 : document.getElementById("password4-0").value,
    GateWay4 : document.getElementById("gateway4-0").value,
    DHCP4 : document.getElementById("dhcp4-0").value,
    NatIP4 : document.getElementById("static-nat-ip4-0").value,

    NetworkType6 : document.getElementById("type6-0").value,
    IP6 : document.getElementById("ip-6").value,
    UserName6 : document.getElementById("username6-0").value,
    PrefixLength6 : document.getElementById("prefix-length6-0").value,
    Password6 : document.getElementById("password6-0").value,
    GateWay6 : document.getElementById("gateway6-0").value,
    DHCP6 : document.getElementById("dhcp6-0").value,
    NatIP6 : document.getElementById("static-nat-ip6-0").value,

    CS : document.getElementById("cs").checked,
    PreferredController : document.getElementById("preferred-controller").checked,
    GateWay : document.getElementById("gateway").checked,
    EndPoint4 : document.getElementById("end-point4").value,
    EndPoint6 : document.getElementById("end-point6").value,
}