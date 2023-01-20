function onSignIn(googleUser) {

      // Get the user's ID token and basic profile information
    var id_token = googleUser.credential;
    console.log(id_token)
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
    console.log("success", data);
    console.log(data.allInfo)
    const allInfo = data.allInfo;
    
    // check if email ends in stuy.edu
    if (allInfo.email.endsWith("stuy.edu") || allInfo.email===("zkarim7676@gmail.com")) {
        window.email = allInfo.email;
        document.getElementById("submit").className = "button";
        document.getElementById("googleButton").className = "googleHide";
        document.getElementById("signInSuccess").className = "signInShow"
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
  

processUser = () => {
    

    name = document.getElementById("name").value;

    

    courseCode1 = document.getElementById("course-code1").value;
    section1 = document.getElementById("section1").value;
    room1 = document.getElementById("room1").value;

    courseCode2 = document.getElementById("course-code2").value;
    section2 = document.getElementById("section2").value;
    room2 = document.getElementById("room2").value;

    courseCode3 = document.getElementById("course-code3").value;
    section3 = document.getElementById("section3").value;
    room3 = document.getElementById("room3").value;

    courseCode4 = document.getElementById("course-code4").value;
    section4 = document.getElementById("section4").value;
    room4 = document.getElementById("room4").value;

    courseCode5 = document.getElementById("course-code5").value;
    section5 = document.getElementById("section5").value;
    room5 = document.getElementById("room5").value;

    courseCode6 = document.getElementById("course-code6").value;
    section6 = document.getElementById("section6").value;
    room6 = document.getElementById("room6").value;

    courseCode7 = document.getElementById("course-code7").value;
    section7 = document.getElementById("section7").value;
    room7 = document.getElementById("room7").value;
    
    courseCode8 = document.getElementById("course-code8").value;
    section8 = document.getElementById("section8").value;
    room8 = document.getElementById("room8").value;

    courseCode9 = document.getElementById("course-code9").value;
    section9 = document.getElementById("section9").value;
    room9 = document.getElementById("room9").value;

    courseCode10 = document.getElementById("course-code10").value;
    section10 = document.getElementById("section10").value;
    room10 = document.getElementById("room10").value;


    fullInfo = {
        "Name": name,
        "Email": window.email,
        "Period1": {
            "CourseCode": courseCode1,
            "Section": section1,
            "Room": room1
        },
        "Period2": {
            "CourseCode": courseCode2,
            "Section": section2,
            "Room": room2
        },
        "Period3": {
            "CourseCode": courseCode3,
            "Section": section3,
            "Room": room3
        },
        "Period4": {
            "CourseCode": courseCode4,
            "Section": section4,
            "Room": room4
        },
        "Period5": {
            "CourseCode": courseCode5,
            "Section": section5,
            "Room": room5
        },
        "Period6": {
            "CourseCode": courseCode6,
            "Section": section6,
            "Room": room6
        },
        "Period7": {
            "CourseCode": courseCode7,
            "Section": section7,
            "Room": room7
        },
        "Period8": {
            "CourseCode": courseCode8,
            "Section": section8,
            "Room": room8
        },
        "Period9": {
            "CourseCode": courseCode9,
            "Section": section9,
            "Room": room9
        },
        "Period10": {
            "CourseCode": courseCode10,
            "Section": section10,
            "Room": room10
        }

    }
    console.log('button was clicked');
    console.log(fullInfo);

    fetch('/sendSharedVariable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sharedVariable : fullInfo })
        })
        .then(response => {
            console.log(response.status);
            if (response.status == 200) {
                document.getElementById("submit").className = "hiddenButton"
                console.log("hidden!")
                document.getElementById("success").style.display = "block"
            }
            else alert("Something went wrong");
        })
        .catch(error => {
            console.log(error);
        });
            
        ;
}
