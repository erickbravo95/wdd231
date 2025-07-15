const date = new Date();
let year = date.getFullYear();
document.getElementById("current-year").innerHTML = year;
document.getElementById('last-modi').innerHTML = 'Last modification: '+document.lastModified;
