const url = window.location.search;
    
const urlParams = new URLSearchParams(url)

let notes_id = urlParams.get('notes_id');
let heading = urlParams.get('heading');
let date = urlParams.get('createdOn');
let notes = urlParams.get('notes');

console.log(heading,date,notes)

const usernotesform = document.createElement("form");
usernotesform.id = "usernotesform";
document.querySelector(".journal").append(usernotesform)

const headlineH1 = document.createElement("input");
headlineH1.id = "headline";
headlineH1.value = heading;
usernotesform.appendChild(headlineH1);

const labellastmodifiedLabel = document.createElement("label");
labellastmodifiedLabel.id = "labellastmodified";
labellastmodifiedLabel.innerText = "Last Modified";
usernotesform.appendChild(labellastmodifiedLabel);

const lastmodifiedH3 = document.createElement("h3");
lastmodifiedH3.id = "lastmodified";
lastmodifiedH3.innerText = date;
usernotesform.appendChild(lastmodifiedH3);

const hr = document.createElement("hr");
usernotesform.appendChild(hr);

const notesinputTextarea = document.createElement("textarea");
notesinputTextarea.name = "usernotes";
notesinputTextarea.id = "notesinput";
notesinputTextarea.cols = "95";
notesinputTextarea.rows = "25";
notesinputTextarea.value = notes;
usernotesform.appendChild(notesinputTextarea);




// edit notes
let allnotes = JSON.parse(localStorage.getItem("usernotes"));
function editnotes() {

let notesheading = document.getElementById("headline").value;
let notes_se = document.getElementById("notesinput").value;

for(let i = 0; i < allnotes.length; i++){
    if(allnotes[i].notes_id == notes_id){
        allnotes[i].heading = notesheading;
        allnotes[i].notes = notes_se;
        Notify.success("Your Notes are Saved");
        window.location.href = "notesall.html";
    }
    localStorage.setItem("usernotes",JSON.stringify(allnotes))
}

}

// Delete Notes
function deletenotes() {
    let response = confirm("Are you sure want to delete your account?")

    if(response){
        for (let i = 0; i <  allnotes.length; i++) {
            if(allnotes[i].notes_id == notes_id){
                allnotes.splice(i,1)
                localStorage.setItem("usernotes",JSON.stringify(allnotes))
                Notify.error("Notes Deleted")
                window.location.href = "notesall.html";  
            }
        }
    }
} 
