
console.log("Welcome to notes app. This is app.js");
showNotes();

let addBtn = document.getElementById("addBtn"); //Save Note
addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt"); //text area->accessing the txt from the textarea by help of key
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //geting the string in object form

    // We are again converting the string in localStorage into objects (every time we click on the add)//
  }
  notesObj.push(addTxt.value); //addTxt.value returns a obj (getiing the data written in text area)//
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = ""; //To clear the textarea
  console.log(notesObj);
  showNotes(); //for display in the saved notes section //
});


// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    // Here we write the inner html code in string format .Then we can append this as inner html to our DOM
    html += `                             
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");   //the card class id is 'notes'
  if (notesObj.length != 0) {  //when the local storage is not empty//
    notesElm.innerHTML = html;  //adding the above html string as inner html;
  } else {
    notesElm.innerHTML = `Nothing To Show! Use the ADD BUTTON to add Note`;
  }
}

function deleteNote(index) {
  // console.log("I am deleting "+index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //geting the string in object form

    // We are again converting the string in localStorage into objects (every time we click on the add)//
  }
//   Start index=index and end index=1;
  notesObj.splice(index, 1); //splice helps in removing  but we have to update the local storage as well to delete//
  //   Again we to puts this updated notesObj into local storage
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes(); //display the new updated Note List
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

