var wan_info = {
    InterfaceName: document.getElementById("interface-name").value,
    PortType : document.getElementById("port-type").value,
    AssociatedPort : document.getElementById("associated-port").value,
    Vlan : document.getElementById("vlan").value,
    MTU : document.getElementById("mtu").value,
   /* AutoNegOn : document.getElementById("on").value,
    AutoNegOff : document.getElementById("off").value,
    Speed50 : document.getElementById("speed50").value,
    Spedd100 : document.getElementById("speed100").value,
    Duplex : document.getElementById("duplex").value,
    HalfDuplex : document.getElementById("halfduplex").value,*/
    LoopbackIP : document.getElementById("loopback-ip").value,
    LoopbackMask: document.getElementById("loopback-mask").value,
    APN : document.getElementById("apn").value,
    MPLS : document.getElementById("mpls").checked,
    DNS4 : document.getElementById("dns4").value,
    DNS6 : document.getElementById("dns6").value,
    CS : document.getElementById("cs").checked,
    PreferredController : document.getElementById("preferred-controller").checked,
    GateWay : document.getElementById("gateway").checked,
    EndPoint4 : document.getElementById("end-point4").value,
    EndPoint6 : document.getElementById("end-point6").value,
}