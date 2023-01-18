console.log('Magic notes');
shownote();
// if a user add a note add it to the local storage
let addbtn = document.getElementById('addbtn').addEventListener('click', addclicked);
function addclicked() {
    let text = document.getElementById('text');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    if(text.value=='')
    {
        alert('Text message cannot be blank');
    }
    else
    {
        
        notesobj.push(text.value);
        localStorage.setItem("notes", JSON.stringify(notesobj));
        text.value = '';
        // console.log(notesobj);
        shownote();
    }
}
function shownote() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = '';
    notesobj.forEach(function (element, index) {
        html +=
            `
        <div class="card mx-2 my-2" style="width: 18rem;">
                <div class=" notecard card-body">
                  <h5 class="card-title">Note ${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button onclick="deletenote(this.id)" id="${index}" class="btn btn-primary">Delete</button> 
                </div>
              </div>
              
        `
    });
    let noteelem =document.getElementById('notes');
    if (notesobj.length!=0) {
        noteelem.innerHTML=html;
    }
    else
    {
        noteelem.innerHTML=`<h2>Nothing to show! add a note to show</h2>`
    }

}

// function to delete note
function deletenote(index)
{
    // console.log('I am deleting',index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownote();

}
let search = document.getElementById('search');
search.addEventListener('input',searching);
search.addEventListener('blur',rebootingsearch);
function rebootingsearch()
{
    shownote();
    search.value='';
}
function searching()
{
    let inputval = search.value.toLowerCase();
    if (inputval.length==0) {
        shownote();
    }
    // console.log('input event fired',inputval);
    let notecard = document.getElementsByClassName('notecard');
    // console.log(notecard);
    Array.from(notecard).forEach(function(element)
    {
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        if (cardtext.includes(inputval)) {
            element.style.display='block';
        }
        else
        {
            element.parentElement.style.display='none';

        }

    })
}