/*attach onclick to the button */

let myButton2 = document.getElementById("myButton2");
myButton2.onclick = function() {
    alert(new Date());
}

/** create event listener */
let myButton3 = document.getElementById("myButton3");
let myButton3Clicked = function() {
    alert("button 3");
}

myButton3.addEventListener('click', myButton3Clicked, false);

let colours = document.getElementById('colours');
const displayColours = document.getElementById('displayColour');
colours.onchange = function() {
    displayColours.innerHTML = '<span style="color: ' + this.value + '">' + this.value + '</span>';
}