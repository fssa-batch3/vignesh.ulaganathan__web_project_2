let users = JSON.parse(localStorage.getItem('userdata'));
let userlogin = JSON.parse(localStorage.getItem('userlogin'));

for (let i = 0; i <  users.length; i++) {
    if(userlogin == users[i].email ){
    document.getElementById("name").value = users[i]["name"];
    document.getElementById("email").value = users[i]["email"];
    }
}
//  enable and disable input for edit and update operation
function enablename() {
document.getElementById("name").disabled = false;
}
function enablepassword() {
    document.getElementById("password").disabled = false;
}


// Edit User Profile
function editprofile() {
    for(let i = 0 ; i < users.length; i++){
    if(document.getElementById("email").value == users[i]["email"]){
        users[i].name = document.getElementById("name").value;
        users[i].password = document.getElementById("password").value;
        }
    }

    if(document.getElementById("name").value != "" && document.getElementById("password").value != ""){
    localStorage.setItem('userdata',JSON.stringify(users))
    Notify.success("Successfully your profile updated")
    // alert("Successfully your profile updated")
    }
    else{
        // alert("Username or password field could not be empty")
        Notify.error("Username or password field could not be empty")
    }
}


// Delete User Profile
function deleteprofile() {
    confirm("Are you sure want to delete your account?")

    for (let i = 0; i <  users.length; i++) {

    if(document.getElementById("email").value == users[i]["email"]){
        users.splice(i,1)//(2,1)
        localStorage.setItem("userdata", JSON.stringify(users));
        window.location.href = 'signup.html';
        Notify.error("Profile Deleted")
    }

    }
}


//google sign in
// Parse query string to see if page request is coming from OAuth 2.0 server.
let params = {};
let regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
    localStorage.setItem('authInfo', JSON.stringify(params));
}
window.history.pushState({}, document.title, "/" + "profile.html");
let info = JSON.parse(localStorage.getItem('authInfo'))
console.log(info['access_token'])
console.log(info['expires_in'])

fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
        "Authorization": `Bearer ${info['access_token']}`
    }
})
    .then(data => data.json())
    .then((info) => {
        console.log(info)
        document.getElementById('name').value = info.name
        document.getElementById('profilePic').setAttribute('src',info.picture)
    })

function logout() {
    fetch("https://oauth2.googleapis.com/revoke?token=" + info['access_token'],
        {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        .then((data) => {
            location.href = "https://freshtime.netlify.app"
        })
}