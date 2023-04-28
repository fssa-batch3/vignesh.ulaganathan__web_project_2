let currentDate = new Date().toJSON().slice(0, 10)
document.querySelector(".welcome").innerHTML = `<h3>Today | ${currentDate}</h3>`;


let notesheading = document.getElementById("headline");
let notescreated = document.getElementById("lastmodified");
let notes_se = document.getElementById("notesinput");

notescreated.value = currentDate;

let existingnotes = JSON.parse(localStorage.getItem("usernotes")) ?? [];

function addnotes() {
    let newnotes = {
        "notes_id":Math.floor(Math.random() * Date.now()),
        "heading": notesheading.value,
        "createdOn": notescreated.value,
        "notes": notes_se.value
    }
    existingnotes.push(newnotes);                                               
    localStorage.setItem("usernotes", JSON.stringify(existingnotes))
}

let savenotes = document.getElementById("savenotes");
    savenotes.addEventListener('click', e => {
        e.preventDefault();
        addnotes();
        // alert("Your Notes are Saved")
        Notify.success("Your Notes are Saved");
        window.location.href = "notesall.html";
});