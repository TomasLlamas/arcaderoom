//CHAT FUNCTIONALITY
// initializing socket, connection to server
var socket = io();
socket.on("connect", function (data) {
  socket.emit("join", "Hello server from client");
});

function scroll() {
  var endOfMessages = document.querySelector("#thread").lastElementChild;
  endOfMessages.scrollIntoView();
}

// listener for 'thread' event, which updates messages
socket.on("thread", function (data) {
  $("#thread").append("<li>" + data + "</li>");
  var localName = document.getElementById("name").value;
  var items = document.getElementById("thread").getElementsByTagName("li");
  for(var e = 0; e < items.length; e++){
    //var message = items[e].value.substring(1, localName.length);
    if(message === localName){
      items[e].style.float = "right";
    }
  }
  scroll();
});

// sends message to server, resets & prevents default form action
$("form").submit(function () {
  var localName = document.getElementById("name").value;
  var message = $("#message").val();
  fullMessage = localName + ": " + message;
  socket.emit("messages", fullMessage);
  this.reset();
  return false;
});





//YOUTUBE EMBED FUNCTIONALITY
function openVideo() {
  document.getElementById("video-hide").style.display = "none";
  document.getElementById("video-show").style.display = "block";
}

function closeVideo() {
  document.getElementById("video-hide").style.display = "block";
  document.getElementById("video-show").style.display = "none";
}

closeVideo();

function play() {
  event.preventDefault();
  var localLink = document.getElementById("link").value;
  document.getElementById("video-player").src = "https://www.youtube.com/embed/" + localLink.slice(32) + "?autoplay=1";
  socket.emit("youtube", localLink);
}

socket.on("youtube", function (data) {
  document.getElementById("video-player").src = "https://www.youtube.com/embed/" + data.slice(32) + "?autoplay=1";
});





var letLogin = true;
//SUBMISSION TO JOIN
function login() {
  var localId = document.getElementById("room").value;
  event.preventDefault();   
  var localName = document.getElementById("name").value;
  var localColor;
  if(letLogin === true){
  if(document.getElementById('option1').checked){
    localColor = "crimson";
  } else if(document.getElementById('option2').checked){
    localColor = "red";
  } else if(document.getElementById('option3').checked){
    localColor = "lightsalmon";
  } else if(document.getElementById('option4').checked){
    localColor = "orangered";
  } else if(document.getElementById('option5').checked){
    localColor = "coral";
  } else if(document.getElementById('option6').checked){
    localColor = "orange";
  } else if(document.getElementById('option7').checked){
    localColor = "khaki";
  } else if(document.getElementById('option8').checked){
    localColor = "darkkhaki";
  } else if(document.getElementById('option9').checked){
    localColor = "yellow";
  } else if(document.getElementById('option10').checked){
    localColor = "lemonchiffon";
  } else if(document.getElementById('option11').checked){
    localColor = "greenyellow";
  } else if(document.getElementById('option12').checked){
    localColor = "lawngreen";
  } else if(document.getElementById('option13').checked){
    localColor = "green";
  } else if(document.getElementById('option14').checked){
    localColor = "darkgreen";
  } else if(document.getElementById('option15').checked){
    localColor = "cyan";
  } else if(document.getElementById('option16').checked){
    localColor = "dodgerblue";
  } else if(document.getElementById('option17').checked){
    localColor = "blue";
  } else if(document.getElementById('option18').checked){
    localColor = "darkblue";
  } else if(document.getElementById('option19').checked){
    localColor = "mediumslateblue";
  } else if(document.getElementById('option20').checked){
    localColor = "pink";
  } else if(document.getElementById('option21').checked){
    localColor = "hotpink";
  } else if(document.getElementById('option22').checked){
    localColor = "magenta";
  } else if(document.getElementById('option23').checked){
    localColor = "indigo";
  } else if(document.getElementById('option24').checked){
    localColor = "white";
  } else if(document.getElementById('option25').checked){
    localColor = "black";
  } else if(document.getElementById('option26').checked){
    localColor = "gray";
  } else {
    document.getElementById("error").innerHTML = "Please choose a color.";
      return;
  }
}

  socket.on("state", function (data) {
    for(var id in data.players){
    if(data.players[id].name === localName){
      document.getElementById("error").innerHTML = "That name is taken. Please choose another.";
      return;

    }

  }
  if(localName === ""){
    document.getElementById("error").innerHTML = "Your name must include at least one character.";
    return false;
  }
  if(localName.length > 20){
    document.getElementById("error").innerHTML = "Your name cannot be longer than 20 characters.";
    return false;
  }
    if(letLogin === true){
    socket.emit("newPlayer", { color: localColor, name: localName, channel: localId });
    document.getElementById("start").style.display = "none";
    socket.emit("messages", "🎉" + localName + " has joined the room!🎉"); 
    letLogin = false;
  }

  });
}





//OVERLAY AND MOUSE DETECTION
var mouseX = 0;
var mouseY = 0;
var overlay = document.getElementById("overlay");

function getMousePos(overlay, evt) {
  var rect = overlay.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

overlay.addEventListener("mousemove", function (evt) {
  var mouse = getMousePos(overlay, evt);
  mouseX = mouse.x-4;
  mouseY = mouse.y-3;
}, false);






//DATA TO EXPORT TO SERVER
var playerData = {
  up: false,
  down: false,
  left: false,
  right: false,
  kick: false,
  emote: false,
  interact: false,
  mouseX: 0,
  mouseY: 0
};



document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 65:
      playerData.left = true;
      break;
    case 87: // W
      playerData.up = true;
      break;
    case 68: // D
      playerData.right = true;
      break;
    case 83: // S
      playerData.down = true;
      break;
    case 32: 
      playerData.kick = true;
      break;
    case 49: 
      playerData.emote = true;
      break;
    case 69:
      playerData.interact = true;
      break;
  }
});
document.addEventListener("keyup", function (event) {
  switch (event.keyCode) {
    case 65: // A
      playerData.left = false;
      break;
    case 87: // W
      playerData.up = false;
      break;
    case 68: // D
      playerData.right = false;
      break;
    case 83: // S
      playerData.down = false;
      break;
    case 32: 
      playerData.kick = false;
      break;
    case 49: 
      playerData.emote = false;
      break;
    case 69:
      playerData.interact = false;
      break;
    }
});





//SVG AREA
var svg = document.getElementById("svg");
var NS = "http://www.w3.org/2000/svg";



socket.on("state", function (data) {
  var currentRoom = "";
  var localName = document.getElementById("name").value;


  while (svg.lastChild) {
    svg.removeChild(svg.lastChild);
}

for (var e = 0; e < data.rooms.length; e++) {
  if(localName === data.rooms[e].name && letLogin === false){
    currentRoom = data.rooms[e].room;
  }
}

var localId = document.getElementById("room").value;

//ROOM DETECTION AND DISPLAY
if(currentRoom === ""){




  for (var id in data.players) {
    var wrongRoom = false;
    for(var f = 0; f < data.rooms.length; f++){
      if(data.rooms[f].name === data.players[id].name){
        wrongRoom = true;
      }
    }
  if(wrongRoom === false && data.players[id].channel === localId){
    var player = data.players[id];

  var rotateNumber = Math.atan2(player.mouseX - player.x, player.mouseY - player.y);
  var degrees = rotateNumber * (180 / Math.PI) * -1 + 90;

  if(player.x < 550 && player.x > 450 && player.y > 589 && player.name === localName){
    socket.emit("roomChange", {name: player.name, room: "trivia"});
    socket.emit("messages", localName + " is now in the trivia room."); 
  }

  if(player.kick === true){
    var kickBody = document.createElementNS(NS, "circle");
    kickBody.setAttribute("cx", player.x);
    kickBody.setAttribute("cy", player.y);
    kickBody.setAttribute("r", 14);
    kickBody.setAttribute("fill", "white");
    svg.appendChild(kickBody);

    var kickHand1 = document.createElementNS(NS, "circle");
    kickHand1.setAttribute("cx", player.x + player.emoteHeight);
    kickHand1.setAttribute("cy", player.y - 15);
    kickHand1.setAttribute("r", 8);
    kickHand1.setAttribute("fill", "white");
    kickHand1.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
    svg.appendChild(kickHand1);

    var kickHand2 = document.createElementNS(NS, "circle");
    kickHand2.setAttribute("cx", player.x + player.emoteHeight);
    kickHand2.setAttribute("cy", player.y + 15);
    kickHand2.setAttribute("r", 8);
    kickHand2.setAttribute("fill", "white");
    kickHand2.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
    svg.appendChild(kickHand2);
  }



  var body = document.createElementNS(NS, "circle");
  body.setAttribute("cx", player.x);
  body.setAttribute("cy", player.y);
  body.setAttribute("r", 10);
  body.setAttribute("fill", player.color);
  svg.appendChild(body);

  var hand1 = document.createElementNS(NS, "circle");
  hand1.setAttribute("cx", player.x + player.emoteHeight);
  hand1.setAttribute("cy", player.y - 15);
  hand1.setAttribute("r", 4);
  hand1.setAttribute("fill", player.color);
  hand1.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(hand1);

  var hand2 = document.createElementNS(NS, "circle");
  hand2.setAttribute("cx", player.x + player.emoteHeight);
  hand2.setAttribute("cy", player.y + 15);
  hand2.setAttribute("r", 4);
  hand2.setAttribute("fill", player.color);
  hand2.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(hand2); 

  var eye1 = document.createElementNS(NS, "circle");
  eye1.setAttribute("cx", player.x + 3);
  eye1.setAttribute("cy", player.y - 4);
  eye1.setAttribute("r", 2);
  eye1.setAttribute("fill", "black");
  eye1.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(eye1); 

  var eye2 = document.createElementNS(NS, "circle");
  eye2.setAttribute("cx", player.x + 3);
  eye2.setAttribute("cy", player.y + 4);
  eye2.setAttribute("r", 2);
  eye2.setAttribute("fill", "black");
  eye2.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(eye2); 



  var items = data.items;
  var itemsThrown = data.itemsThrown;
  var alreadyThrown = false;

    if(player.interact){
      socket.emit("giveDonut", player.name);
    }

    for(var e = 0; e < itemsThrown.length; e++){
      if(itemsThrown[e].name === player.name){
      alreadyThrown = true;
    }
  }

    if(player.kick && alreadyThrown === false){
      for(var g = 0; g < items.length; g++){
        if(items[g] = player){
          socket.emit("throwDonut", player.name);
          break;
        }
      }
      
    }
    for(var e = 0; e < items.length; e++){
    if(items[e] === player.name){
      var donut = document.createElementNS(NS, "text");
      donut.setAttribute("x", player.x + 10);
      donut.setAttribute("y", player.y + -1 * player.emoteHeight + 5);
      donut.setAttribute("transform", "rotate(" + (degrees + 90) + " " + player.x + " " + player.y + ")");
      var donutFinal = document.createTextNode("🍩");
      donut.appendChild(donutFinal);
      svg.appendChild(donut);
    }
    }

      var name = document.createElementNS(NS, "text");
      name.setAttribute("x", player.x);
      name.setAttribute("y", player.y-11);
      name.setAttribute("id", player.mouseX);
      var nameFinal = document.createTextNode(player.name);
      name.appendChild(nameFinal);
      svg.appendChild(name);
      var nameTemp = document.getElementById(player.mouseX)
      var resizeMiddle = nameTemp.getBBox();
      svg.removeChild(nameTemp);
      name.setAttribute("x", player.x - resizeMiddle.width/2);
      svg.appendChild(name);

  for(var e = 0; e < itemsThrown.length; e++){

    var thrownDonut = document.createElementNS(NS, "text");
    thrownDonut.setAttribute("x", itemsThrown[e].x);
    thrownDonut.setAttribute("y", itemsThrown[e].y);
    var thrownDonutFinal = document.createTextNode("🍩");
    thrownDonut.appendChild(thrownDonutFinal);
    svg.appendChild(thrownDonut);
  }
  }
}
}









if (currentRoom === "trivia"){
document.getElementById("current-room").innerHTML = "Trivia";

var background = document.createElementNS(NS, "rect");
background.setAttribute("x", 0);
background.setAttribute("y", 0);
background.setAttribute("width", 1000);
background.setAttribute("height", 600);
background.setAttribute("fill", "tan");
svg.appendChild(background);

var door = document.createElementNS(NS, "rect");
door.setAttribute("x", 450);
door.setAttribute("y", 0);
door.setAttribute("width", 100);
door.setAttribute("height", 11);
door.setAttribute("fill", "brown");
svg.appendChild(door);




  for (var id in data.players) {
    var wrongRoom = true;
    for(var f = 0; f < data.rooms.length; f++){
      if(data.rooms[f].name === data.players[id].name){
        wrongRoom = false;
      }
    }
  if(wrongRoom === false && data.players[id].channel === localId){
    var player = data.players[id];  
  
    
  var rotateNumber = Math.atan2(player.mouseX - player.x, player.mouseY - player.y);
  var degrees = rotateNumber * (180 / Math.PI) * -1 + 90;

  if(player.x < 550 && player.x > 450 && player.y < 11 && player.name === localName){
    socket.emit("roomChange", {name: player.name, room: ""});
    socket.emit("messages", localName + " is now in the lobby."); 
  }

  if(player.kick === true){
    var kickBody = document.createElementNS(NS, "circle");
    kickBody.setAttribute("cx", player.x);
    kickBody.setAttribute("cy", player.y);
    kickBody.setAttribute("r", 14);
    kickBody.setAttribute("fill", "white");
    svg.appendChild(kickBody);

    var kickHand1 = document.createElementNS(NS, "circle");
    kickHand1.setAttribute("cx", player.x + player.emoteHeight);
    kickHand1.setAttribute("cy", player.y - 15);
    kickHand1.setAttribute("r", 8);
    kickHand1.setAttribute("fill", "white");
    kickHand1.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
    svg.appendChild(kickHand1);

    var kickHand2 = document.createElementNS(NS, "circle");
    kickHand2.setAttribute("cx", player.x + player.emoteHeight);
    kickHand2.setAttribute("cy", player.y + 15);
    kickHand2.setAttribute("r", 8);
    kickHand2.setAttribute("fill", "white");
    kickHand2.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
    svg.appendChild(kickHand2);
  }



  var body = document.createElementNS(NS, "circle");
  body.setAttribute("cx", player.x);
  body.setAttribute("cy", player.y);
  body.setAttribute("r", 10);
  body.setAttribute("fill", player.color);
  svg.appendChild(body);

  var hand1 = document.createElementNS(NS, "circle");
  hand1.setAttribute("cx", player.x + player.emoteHeight);
  hand1.setAttribute("cy", player.y - 15);
  hand1.setAttribute("r", 4);
  hand1.setAttribute("fill", player.color);
  hand1.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(hand1);

  var hand2 = document.createElementNS(NS, "circle");
  hand2.setAttribute("cx", player.x + player.emoteHeight);
  hand2.setAttribute("cy", player.y + 15);
  hand2.setAttribute("r", 4);
  hand2.setAttribute("fill", player.color);
  hand2.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(hand2); 

  var eye1 = document.createElementNS(NS, "circle");
  eye1.setAttribute("cx", player.x + 3);
  eye1.setAttribute("cy", player.y - 4);
  eye1.setAttribute("r", 2);
  eye1.setAttribute("fill", "black");
  eye1.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(eye1); 

  var eye2 = document.createElementNS(NS, "circle");
  eye2.setAttribute("cx", player.x + 3);
  eye2.setAttribute("cy", player.y + 4);
  eye2.setAttribute("r", 2);
  eye2.setAttribute("fill", "black");
  eye2.setAttribute("transform", "rotate(" + degrees + " " + player.x + " " + player.y + ")");
  svg.appendChild(eye2); 



  var name = document.createElementNS(NS, "text");
  name.setAttribute("x", player.x);
  name.setAttribute("y", player.y-11);
  name.setAttribute("id", player.mouseX);
  var nameFinal = document.createTextNode(player.name);
  name.appendChild(nameFinal);
  svg.appendChild(name);
  var nameTemp = document.getElementById(player.mouseX)
  var resizeMiddle = nameTemp.getBBox();
  svg.removeChild(nameTemp);
  name.setAttribute("x", player.x - resizeMiddle.width/2);
  svg.appendChild(name);
  }
}


}
});





//SEND DATA TO SERVER
setInterval(function () {
  playerData.mouseX = mouseX;
  playerData.mouseY = mouseY;
  socket.emit("playerData", playerData);
}, 1000 / 60);

