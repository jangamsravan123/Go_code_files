window.onload = function () {
    
}


function showNetwork() {
    if (document.getElementById("network-option").style.display == "none" ) {
        document.getElementById("network-option").style.display = "block"
        document.getElementById("show-network").textContent = "-"
    } else {
        document.getElementById("network-option").style.display = "none"
        document.getElementById("show-network").textContent = "+"
    }

}

function showReachability() {
    if (document.getElementById("reachability").style.display == "none" ) {
        document.getElementById("reachability").style.display = "block"
        document.getElementById("show-reachability").textContent = "-"
    } else {
        document.getElementById("reachability").style.display = "none"
        document.getElementById("show-reachability").textContent = "+"
    }

}

function showPort(){
    if (document.getElementById("port-option").style.display == "none" ) {
        document.getElementById("port-option").style.display = "block"
        document.getElementById("show-port").textContent = "-"
    } else {
        document.getElementById("port-option").style.display = "none"
        document.getElementById("show-port").textContent = "+"
    }

}

