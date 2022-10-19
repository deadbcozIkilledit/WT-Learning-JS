let clock = document.getElementById('clock');

doDateUpdate();
setInterval(doDateUpdate, 1000);

function doDateUpdate() {
    let date = new Date();
    clock.innerHTML = date.toLocaleTimeString();
}