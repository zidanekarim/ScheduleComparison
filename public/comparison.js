var darkCheck = false;
function loginUser() {
    let email = document.getElementById("emailLogin").value;
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

            const emails1 = [];
            const emails2 = [];
            const emails3 = [];
            const emails4 = [];
            const emails5 = [];
            const emails6 = [];
            const emails7 = [];
            const emails8 = [];
            const emails9 = [];
            const emails10 = [];

            for (let i = 0; i < schedule1.length; i++) {
                emails1.push(schedule1[i].email);
            }
            for (let i = 0; i < schedule2.length; i++) {
                emails2.push(schedule2[i].email);
            }
            for (let i = 0; i < schedule3.length; i++) {
                emails3.push(schedule3[i].email);
            }
            for (let i = 0; i < schedule4.length; i++) {
                emails4.push(schedule4[i].email);
            }
            for (let i = 0; i < schedule5.length; i++) {
                emails5.push(schedule5[i].email);
            }
            for (let i = 0; i < schedule6.length; i++) {
                emails6.push(schedule6[i].email);
            }
            for (let i = 0; i < schedule7.length; i++) {
                emails7.push(schedule7[i].email);
            }
            for (let i = 0; i < schedule8.length; i++) {
                emails8.push(schedule8[i].email);
            }
            for (let i = 0; i < schedule9.length; i++) {
                emails9.push(schedule9[i].email);
            }
            for (let i = 0; i < schedule10.length; i++) {
                emails10.push(schedule10[i].email);
            }
            
            // display all tables
            

            const Period1Table = document.getElementById("Period1Table").getElementsByTagName('tbody')[0];
            // add emails from email1 into Period1Table
            for (let i = 0; i < emails1.length; i++) {
                let newRow = Period1Table.insertRow(Period1Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails1[i];
            }
            // do this for all 10 periods
            const Period2Table = document.getElementById("Period2Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails2.length; i++) {
                let newRow = Period2Table.insertRow(Period2Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails2[i];
            }

            const Period3Table = document.getElementById("Period3Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails3.length; i++) {
                let newRow = Period3Table.insertRow(Period3Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails3[i];
            }

            const Period4Table = document.getElementById("Period4Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails4.length; i++) {
                let newRow = Period4Table.insertRow(Period4Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails4[i];
            }

            const Period5Table = document.getElementById("Period5Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails5.length; i++) {
                let newRow = Period5Table.insertRow(Period5Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails5[i];
            }

            const Period6Table = document.getElementById("Period6Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails6.length; i++) {
                let newRow = Period6Table.insertRow(Period6Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails6[i];
            }

            const Period7Table = document.getElementById("Period7Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails7.length; i++) {
                let newRow = Period7Table.insertRow(Period7Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails7[i];
            }

            const Period8Table = document.getElementById("Period8Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails8.length; i++) {
                let newRow = Period8Table.insertRow(Period8Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails8[i];
            }
            const Period9Table = document.getElementById("Period9Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails9.length; i++) {
                let newRow = Period9Table.insertRow(Period9Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails9[i];
            }
            const Period10Table = document.getElementById("Period10Table").getElementsByTagName('tbody')[0];
            for (let i = 0; i < emails10.length; i++) {
                let newRow = Period10Table.insertRow(Period10Table.length);
                let cell = newRow.insertCell(0);
                cell.innerHTML = emails10[i];
            }

            // hide submit button 
            document.getElementById("submitCompare").className = "hiddenButton";


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
        });
        // make all borders white
        var elements = document.querySelectorAll(".main-table");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".main-table th");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".main-table td");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".main-table tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });

        var elements = document.querySelectorAll(".periodRow");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".periodRow td");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".periodRow tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".periodRow th");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });


        //console.log(localStorage.getItem('darkCheck') + "second");
    }
    else {
        //console.log(localStorage.getItem('darkCheck') + "0.5");
        element.className = "light-mode";
        var elements = document.querySelectorAll(".navbar li a");
        elements.forEach(function(element){
            element.style.color = "black";
        });
        // make all borders white
        var elements = document.querySelectorAll(".main-table");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".main-table th");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".main-table td");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".main-table tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });

        var elements = document.querySelectorAll(".periodRow");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".periodRow td");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".periodRow tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".periodRow th");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });

        
        //console.log(localStorage.getItem('darkCheck') + "third");
        
    }
}
