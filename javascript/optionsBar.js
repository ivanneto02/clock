document.getElementById("homeOption").onmouseover = function() {mouseOver("homeOption", "fa-home")};
document.getElementById("homeOption").onmouseout = function() {mouseOut("homeOption", "fa-home")}; 

document.getElementById("alarmOption").onmouseover = function() {mouseOver("alarmOption", "fa-bell-o")};
document.getElementById("alarmOption").onmouseout = function() {mouseOut("alarmOption", "fa-bell-o")}; 

document.getElementById("timerOption").onmouseover = function() {mouseOver("timerOption", "fa-hourglass-2")};
document.getElementById("timerOption").onmouseout = function() {mouseOut("timerOption", "fa-hourglass-2")}; 

document.getElementById("stopwatchOption").onmouseover = function() {mouseOver("stopwatchOption", "fa-clock-o")};
document.getElementById("stopwatchOption").onmouseout = function() {mouseOut("stopwatchOption", "fa-clock-o")}; 

function name(id){

}

function mouseOver(id, faClass) {
    document.getElementById(id).classList.remove("fa");
    document.getElementById(id).classList.remove(faClass);
    document.getElementById(id).innerHTML = id.substr(0, id.length - 6);

    document.querySelector(".button-options").style.width = "90px";
    
}
 
function mouseOut(id, faClass) {
    document.querySelector(".button-options").style.width = "50px";

    document.getElementById(id).classList.add("fa");
    document.getElementById(id).classList.add(faClass);
    document.getElementById(id).innerHTML = "";
}

