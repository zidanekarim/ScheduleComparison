var darkCheck = false;



function signOut() {
    // show signInTable by removing hideTable class
    document.getElementById("signInTable").className = "signInTable";

    // show google button
    document.getElementById("googleButton").className = "g_id_signin";

    // hide signOut button
    document.getElementById("signOut").className = "signOutHide";

    // hide signInSuccess
    document.getElementById("signInSuccess").className = "signInHide";

    // remove email from local storage
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    // clear each Period Table's body
    for (let i = 1; i <= 10; i++) {
        let table = $(`#Period${i}Table tbody`);
        table.find('tr td:not(:first-child)').remove();
    }

    // hide compareDiv
    document.getElementById("compareDiv").className = "compareDivHide";
    
    



}

function onSignIn(googleUser) {

      // Get the user's ID token and basic profile information
    var id_token = googleUser.credential;
    //console.log(id_token)
      // Send the ID token to server-side script called index.js for verification and
      // to create a session.

      


    fetch('/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Referrer-Policy': 'no-referrer-when-downgrade'},
    body: JSON.stringify({ id_token:id_token})
    })
    .then(response => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
    })
    .then(data => {
    //console.log("success", data);
    //.log(data.allInfo)
    const allInfo = data.allInfo;
    
    // check if email ends in stuy.edu
    if (allInfo.email.endsWith("stuy.edu") || allInfo.email===("zkarim7676@gmail.com")) {
        console.log("I got here!")
        window.username = allInfo.name;
        window.email = allInfo.email;

        // store email in local storage
        localStorage.setItem("email", window.email);
        localStorage.setItem("name", window.username);

        document.getElementById("signInTable").className = "hideTable";
        document.getElementById("signInSuccess").className = "signInShow";
        document.getElementById("signInSuccess").innerHTML = "Successfully signed in as " + window.username;
        // show sign out button
        document.getElementById("signOut").className = "signOutShow";
        loginUser();

        
    }
    else {
        alert("You are not a Stuyvesant student. Please use a Stuyvesant email address.");
    }

    })
    .catch(error => {
    console.log("error", error);
    // Handle the error, for example, by displaying an error message to the user.
    });
}
  




function loginUser() {
    let email = window.email;
    console.log("Logging in...")
    // check if email ends in @stuy.edu

    if (email == "" || email == null || email == undefined  || email == " " || !email.endsWith ("@stuy.edu")) {
        alert("Please enter a valid email");
        return;
    }
    console.log(email);
    fetch('/comparison', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status == 404) {
                alert("User not found");
                return;
            }

           // show compareDiv
              document.getElementById("compareDiv").className = "compareDivShow";

            const schedule = data.allSchedules;
            const schedule1 = schedule[0];
            const schedule2 = schedule[1];
            const schedule3 = schedule[2];
            const schedule4 = schedule[3];
            const schedule5 = schedule[4];
            const schedule6 = schedule[5];
            const schedule7 = schedule[6];
            const schedule8 = schedule[7];
            const schedule9 = schedule[8];
            const schedule10 = schedule[9];

            const names1 = [];
            const names2 = [];
            const names3 = [];
            const names4 = [];
            const names5 = [];
            const names6 = [];
            const names7 = [];
            const names8 = [];
            const names9 = [];
            const names10 = [];

            for (let i = 0; i < schedule1.length; i++) {
                names1.push(schedule1[i].name);
            }
            for (let i = 0; i < schedule2.length; i++) {
                names2.push(schedule2[i].name);
            }
            for (let i = 0; i < schedule3.length; i++) {
                names3.push(schedule3[i].name);
            }
            for (let i = 0; i < schedule4.length; i++) {
                names4.push(schedule4[i].name);
            }
            for (let i = 0; i < schedule5.length; i++) {
                names5.push(schedule5[i].name);
            }
            for (let i = 0; i < schedule6.length; i++) {
                names6.push(schedule6[i].name);
            }
            for (let i = 0; i < schedule7.length; i++) {
                names7.push(schedule7[i].name);
            }
            for (let i = 0; i < schedule8.length; i++) {
                names8.push(schedule8[i].name);
            }
            for (let i = 0; i < schedule9.length; i++) {
                names9.push(schedule9[i].name);
            }
            for (let i = 0; i < schedule10.length; i++) {
                names10.push(schedule10[i].name);
            }
            
            // display all tables
            

            
            // add schedule1.courseCode1 into Period1Table th title
            //console.log(schedule1[0])
            console.log(document.getElementById("Period1Table"));
            document.getElementById("Period1Table").getElementsByTagName('th')[0].setAttribute("title", schedule1[0].Period1.courseCode1);
            document.getElementById("Period2Table").getElementsByTagName('th')[0].setAttribute("title", schedule2[0].Period2.courseCode2);
            document.getElementById("Period3Table").getElementsByTagName('th')[0].setAttribute("title", schedule3[0].Period3.courseCode3);
            document.getElementById("Period4Table").getElementsByTagName('th')[0].setAttribute("title", schedule4[0].Period4.courseCode4);
            document.getElementById("Period5Table").getElementsByTagName('th')[0].setAttribute("title", schedule5[0].Period5.courseCode5);
            document.getElementById("Period6Table").getElementsByTagName('th')[0].setAttribute("title", schedule6[0].Period6.courseCode6);
            document.getElementById("Period7Table").getElementsByTagName('th')[0].setAttribute("title", schedule7[0].Period7.courseCode7);
            document.getElementById("Period8Table").getElementsByTagName('th')[0].setAttribute("title", schedule8[0].Period8.courseCode8);
            document.getElementById("Period9Table").getElementsByTagName('th')[0].setAttribute("title", schedule9[0].Period9.courseCode9);
            document.getElementById("Period10Table").getElementsByTagName('th')[0].setAttribute("title", schedule10[0].Period10.courseCode10);

            // add emails from email1 into Period1Table
            const Period1Table = document.getElementById("Period1Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names1.length; i++) {
                let newRow = Period1Table.insertRow(Period1Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names1[i];
                // set title of cell to the user's email
                cell.setAttribute("title", schedule1[i].email);
                cell.setAttribute("class", "student");
            }
            // do this for all 10 periods
            const Period2Table = document.getElementById("Period2Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names2.length; i++) {
                let newRow = Period2Table.insertRow(Period2Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names2[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule2[i].email);
            }

            const Period3Table = document.getElementById("Period3Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names3.length; i++) {
                let newRow = Period3Table.insertRow(Period3Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names3[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule3[i].email);
            }

            const Period4Table = document.getElementById("Period4Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names4.length; i++) {
                let newRow = Period4Table.insertRow(Period4Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names4[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule4[i].email);
            }

            const Period5Table = document.getElementById("Period5Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names5.length; i++) {
                let newRow = Period5Table.insertRow(Period5Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names5[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule5[i].email);
            }

            const Period6Table = document.getElementById("Period6Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names6.length; i++) {
                let newRow = Period6Table.insertRow(Period6Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names6[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule6[i].email);
            }

            const Period7Table = document.getElementById("Period7Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names7.length; i++) {
                let newRow = Period7Table.insertRow(Period7Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names7[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule7[i].email);
            }

            const Period8Table = document.getElementById("Period8Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names8.length; i++) {
                let newRow = Period8Table.insertRow(Period8Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names8[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule8[i].email);
            }
            const Period9Table = document.getElementById("Period9Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names9.length; i++) {
                let newRow = Period9Table.insertRow(Period9Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names9[i];
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule9[i].email);
            }
            const Period10Table = document.getElementById("Period10Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < names10.length; i++) {
                let newRow = Period10Table.insertRow(Period10Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = names10[i];
                // set class of cell to "student"
                cell.setAttribute("class", "student");
                cell.setAttribute("title", schedule10[i].email);
            }

            // hide submit button 


    })
        
    
            
}



window.onload = function() {
    if (localStorage.getItem('darkCheck') === null) {
    // set darkCheck to true
    //console.log("got ehre!")
    localStorage.setItem('darkCheck', true);
    }
    //console.log(localStorage.getItem('darkCheck') + " is darkCheck")
    //console.log(localStorage.getItem('darkCheck'), typeof localStorage.getItem('darkCheck'))
    darkmode();
    if (localStorage.getItem('email') !== null) {

        window.username = localStorage.getItem('name')
        window.email = localStorage.getItem('email')
        document.getElementById("signInTable").className = "hideTable";
        document.getElementById("signInSuccess").className = "signInShow";
        document.getElementById("signInSuccess").innerHTML = "Successfully signed in as " + window.username;
        

        // show signOut button
        document.getElementById("signOut").className = "signOutShow";
        loginUser();


    }
};   
function switchColors() {
    if (localStorage.getItem('darkCheck') === "true") {
        localStorage.setItem('darkCheck', false);
    }
    else {
        localStorage.setItem('darkCheck', true);
    }
    darkmode();
}


function darkmode() {
    
    var element = document.body;
    
    if (localStorage.getItem('darkCheck') === "false") {
        element.className = "dark-mode";
        
        var elements = document.querySelectorAll(".navbar li a");
        elements.forEach(function(element){
            element.style.color = "white";
            element.style.border = "2px solid white";
        });
        // make all borders white


        

      


        //console.log(localStorage.getItem('darkCheck') + "second");
    }
    else {
        //console.log(localStorage.getItem('darkCheck') + "0.5");
        element.className = "light-mode";
        var elements = document.querySelectorAll(".navbar li a");
        elements.forEach(function(element){
            element.style.color = "black";
            element.style.border = "2px solid black";
            
        
        });

        
        //console.log(localStorage.getItem('darkCheck') + "third");
        
    }
}

