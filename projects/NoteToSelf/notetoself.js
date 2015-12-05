window.onload = init;

function init() {
  var button = document.getElementById("add_button");
  var clearButton = document.getElementById("clear_button");
  button.onclick = createSticky;
  clearButton.onclick = clearStorage;


  var stickiesArray = getStickiesArray();
  for (var i = 0; i < stickiesArray.length; i++) {
    var key = stickiesArray[i];
    var value = JSON.parse(localStorage[key]);
    addStickyToDOM(key, value);
  }
}


//DOM Edit
function addStickyToDOM(key, stickyObj) {
  var stickies = document.getElementById("stickies");
  var sticky = document.createElement("li");
  sticky.style.backgroundColor = stickyObj.color;
  var span = document.createElement("span");
  span.setAttribute("class", "sticky");
  sticky.setAttribute("class", "liSticky");
  sticky.setAttribute("id", key);
  span.innerHTML = stickyObj.value;
  sticky.appendChild(span);

  if (stickies.firstChild) {
    stickies.insertBefore(sticky, stickies.firstChild);
  } else {
    stickies.appendChild(sticky);
  }

  sticky.onclick = deleteSticky;
}

function removeStickyFromDOM(key) {
  var sticky = document.getElementById(key);
  sticky.parentNode.removeChild(sticky);
}


//CRUD to Local Storage
function getStickiesArray() {
  var stickiesArray = localStorage["stickiesArray"];
  if (!stickiesArray) {
    stickiesArray = [];
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  } else {
    stickiesArray = JSON.parse(stickiesArray);
  }
  return stickiesArray;
}


//Listeners
function clearStorage() {
  localStorage.clear();

  var elements = document.getElementsByClassName("liSticky");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function createSticky() {
  var stickiesArray = getStickiesArray();
  var currentDate = new Date();
  var colorSelectObj = document.getElementById("note_color");
  var index = colorSelectObj.selectedIndex;
  var color = colorSelectObj[index].value;

  var key = "sticky_" + currentDate.getTime();
  var value = document.getElementById("note_text").value;

  var stickObj = {
      "value": value,
      "color": color
  };



  stickiesArray.splice(stickiesArray.length, 0, key); // вставляем новый элемент в начало
  localStorage.setItem(key, JSON.stringify(stickObj));
  localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  addStickyToDOM(key, stickObj)
}

function deleteSticky(e) {

  if (confirm("Remove this stick?")) {
  
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
      key = e.target.parentNode.id;
    }

    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if (stickiesArray) {
      for (var i = 0; i < stickiesArray.length; i++) {
        if (key == stickiesArray[i]) {
          stickiesArray.splice(i, 1);
        }
      }
        
      localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
      removeStickyFromDOM(key);
    }
  } 
}

  

