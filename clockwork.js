alert(localStorage.getItem("theme"));
if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "https://redstone-nw.netlify.app/clockwork-app/clockstyle.css")
  localStorage.setItem("facReset", "false");
}
if (localStorage.getItem("theme").length < 7 || localStorage.getItem("facReset") == "true") {
  localStorage.setItem("theme", "https://redstone-nw.netlify.app/clockwork-app/clockstyle.css")
  localStorage.setItem("facReset", "false");
}
addTheme(localStorage.getItem("theme"));

apps = JSON.parse(localStorage.getItem("apps"));
if (apps == null) {
  localStorage.setItem("apps", JSON.stringify(new Array()));
  var apps = new Array();
}
var arrayLength = apps.length;
for (var i = 0; i < arrayLength; i++) {
  addApp(apps[i]);
}

function scrollbarVisible(element) {
  return element.scrollHeight > element.clientHeight;
}

function uninstallApp(unid) {
  var apps = JSON.parse(localStorage.getItem("apps"));
  if (confirm("Are you sure you want to delete this app? You'll lose all your saved data!") == true) {
    for (var i = apps.length - 1; i >= 0; --i) {
      if (apps[i] == unid) {
        apps.splice(i,1);
        break;
      }
    }
    localStorage.setItem("apps", JSON.stringify(apps));

    var paras = document.getElementsByClassName(unid);
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    alert("App uninstalled. You may need to restart Clockwork to finish uninstalling.")
  }
  apps = JSON.parse(localStorage.getItem("apps"));
  console.log(apps);
}

function openapp(appname, appurl) {
  var main = document.getElementById('main');
  for (const child of main.children) {
    child.style = "display: none;";
  }
  var appname = document.getElementById(appname);
  if (appname != null) {
    if (appname.nodeName == "IFRAME") {
      if (appname.src == "about:blank") {
        appname.src = appurl;
      }
    } 
    if (appname.id == "flashgame") {
      appname.remove();
      var appname = document.createElement("embed");
      appname.id = "flashgame";
      appname.className = "app";
      appname.src = appurl;
      document.getElementById("main").appendChild(appname);
    }
    if (appname.id == "game") {
      appname.remove();
      var appname = document.createElement("iframe");
      appname.id = "game";
      appname.className = "app";
      appname.style = "width: 100%; height: calc(100vh - 36px); border: none;";
      appname.src = appurl;
      document.getElementById("main").appendChild(appname);
    }

    appname.style = "display: block;";
  } else {
    console.log("// ERROR \nApp of name does not exist");
  }
}

function closeApp(appname) {
  var appname = document.getElementById(appname);
  if (appname != null) {
    if (appname.nodeName == "IFRAME") {
      appname.src = "about:blank";
    } 

    appname.style = "display: none;";
  } else {
    console.log("// ERROR \nApp of name does not exist");
  }
}
//https://sub64.netlify.app/clockwork-beta/clock2.css

function addApp(scr) {
  var scriptelem = document.createElement("script");
  scriptelem.src = scr;
  document.body.appendChild(scriptelem);
  var aelem = document.createElement("a");
  aelem.href = "javascript:uninstallApp('"+scr+"');";
  aelem.innerHTML = scr + "<br>";
  aelem.className = "consolea " + scr;
  document.getElementById("applist").appendChild(aelem);
}

function installAppV2(source, script) {
  var conf;
  if (source.includes("clockwork-store.glitch.me") == false) {
     conf = confirm(`//// READ THIS MESSAGE!!!! ////
An untrusted app is trying to install a script to Clockwork. Apps can easily install malicious scripts if you aren't careful.

APP URL: `+script+`

Are you ABSOULTELY SURE you want to continue with installation?`);
  } else {
    conf = confirm(`Are you sure you want to install this app?`);
  }
  if (conf == true) {
    if (apps.includes(script) == true) {
      alert("App is already installed!");
    } else {
      apps.push(script);
      addApp(script);
      localStorage.setItem("apps", JSON.stringify(apps));
      console.log(apps);
    }
  }
}

function installApp(appscript) {
  openapp('appstoreinstalling','mongus');
  if (appscript == null) {
    var appscript = prompt("Enter the URL of your custom script.");
  }
  if (apps.includes(appscript) == true) {
    alert("App is already installed!");
  } else {
    console.warn("installApp() is deprecated! We've made it so it doesn't install apps forever for security reasons.\nPlease use installAppV2() instead")
    if (confirm("This app is using outdated code - it may break at any time. Continue?") == true) {
      addApp(appscript);
    }
  }
  openapp('appstore','mongus');
}
function sschk(element) {
  if (element.className != "donotremove-ss") {
    element.remove();
  }
}

function addTheme(ss) {
  if (ss == null) {
    ss2 = prompt("Enter the link to the stylesheet.css file.");
  } else {
    ss2 = ss;
  }
  document.querySelectorAll('style,link[rel="stylesheet"]')
  .forEach(element => sschk(element));

  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = ss2;

  document.body.appendChild(link);
  
  var theme = ss2;
  localStorage.setItem("theme", theme);
}

function startLoop() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('extra').innerHTML =  h + ":" + m + ":" + s;

  apps = JSON.parse(localStorage.getItem("apps"));
  
  setTimeout(startLoop, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function unhide() {
  document.body.style = "display:block;";
  document.getElementById("loadingtxt").remove();
}

function factoryReset() {
  if (confirm("Are you ABSOLUTELY SURE you want to factory reset Clockwork?\nAll your themes and apps (and some data) will be gone!")) {
    localStorage.setItem("apps", "[]");
    localStorage.setItem("facReset", "true");
    addTheme('https://redstone-nw.netlify.app/clockwork-app/clockstyle.css');
    document.location.reload();
  }
}

setTimeout(unhide, 1500);

function showMenu() {
  e.preventDefault();

  if (document.getElementById("contextMenu").style.display == "block") {
    hideMenu();
  } else {
    document.getElementById("unins-cm").href = "javascript:alert('"+v.className+"');";
    var menu = document.getElementById("contextMenu");

    menu.style.display = 'block';
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
  }
}

function hideMenu() {
  document.getElementById("contextMenu").style.display = "none";
}
document.onclick = hideMenu;

window.addEventListener('message', function(event) {
  if (event.data.length > 1) {
    if (event.data[0] == "install app") { //data.origin
      installAppV2(event.origin,event.data[1]);
    }
    if (event.data[0] == "install theme") { //data.origin
      addTheme(event.data[1]);
    }
  }
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});