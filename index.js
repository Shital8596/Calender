
function displayDefaultCalender() {
    const date = new Date();
    const mon = date.getMonth()
    const yea = date.getFullYear()

    const lastMonthDay = new Date(yea, mon + 1, 0).getDate();
    const firstMonDay = date.getDay() + 1;
    const lastWeekDay = new Date(yea, mon + 1, 0).getDay() + 1;
    console.log(lastWeekDay)
    let j = 0;
    let monthDays = document.getElementById("tableRows")
    let days = "";

    while (j < firstMonDay) {
        days += `<div class="grid-item"></div>`
        j++;
    }

    for (let i = 1; i <= lastMonthDay; i++) {
        days += `<div class="grid-item itemDiv" id="${i}">${i}</div>`
    }
    for (let i = lastWeekDay; i < 7; i++) {
        days += `<div class="grid-item"></div>`
    }
    monthDays.innerHTML = days
}
displayDefaultCalender();



function showCalender() {
    let month, year, lastDay, firstDay;
    month = document.getElementById("selectMonth").value
    year = document.getElementById("selectYear").value


    async function getData() {
        let res = await fetch('http://localhost/calendar/calendar.php/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ "month": month, "year": year })
        })
        let data = await res.json();
        console.log(data);
        firstDay = data.firstDay;
        lastDay = data.daysInMonth;
        // console.log(lastWeekDay);
        displayCalender(firstDay, lastDay);
    }


    function displayCalender(firstDay, lastDay) {
        const d = new Date(`${year}-${month}-${lastDay}`);
        const yea = d.getFullYear();
        const mon = d.getMonth();
        const lastWeekDay = new Date(yea, mon + 1, 0).getDay() + 1;


        let j = 0;
        let monthDays = document.getElementById("tableRows")
        let days = "";

        while (j < firstDay) {
            days += `<div class="grid-item"></div>`
            j++;
        }

        for (let i = 1; i <= lastDay; i++) {
            days += `<div class="grid-item itemDiv" id="${i}">${i}</div>`
        }
        for (let i = lastWeekDay; i <= 7; i++) {
            days += `<div class="grid-item"></div>`
        }
        monthDays.innerHTML = days
    }
    getData()
}




// Function to change bgColor

function changeBg() {

    const dateVal = document.getElementById("inputText").value;

    async function getDataForBg() {
        let res = await fetch('http://localhost/calendar/colorBg.php/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ "date": dateVal })
        })
        let data = await res.json();
        console.log(data);
        color = data.color;
        setColor(color);
    }

    const currentCells = document.querySelectorAll(".itemDiv");
    for (let item of currentCells) {
        // console.log(item.id)
        if (item.id == dateVal) {
            function setColor(color) {
                if (color == "green") {
                    item.style.backgroundColor = "green";
                } else {
                    item.style.backgroundColor = "white";
                }
            }
        }
    }

    getDataForBg()
}


