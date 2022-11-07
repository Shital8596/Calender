
function displayDefaultCalender() {
    const date = new Date();
    const mon = date.getMonth()
    const yea = date.getFullYear()

    const lastMonthDay = new Date(yea, mon + 1, 0).getDate();
    const firstMonDay = date.getDay() + 1;
    const lastWeekDay = new Date(yea, mon + 1, 0).getDay();
    console.log(lastWeekDay)
    let j = 0;
    let monthDays = document.getElementById("tableRows")
    let days = ""; 

    while (j < firstMonDay) {
        days += `<div class="grid-item"></div>`
        j++;
    }
    
    for (let i = 1; i <= lastMonthDay; i++) {
        days += `<div class="grid-item" id="${i}">${i}</div>`
    }
    for (let i = lastWeekDay+1; i <= 7; i++) {
        days += `<div class="grid-item"></div>`
    }
    monthDays.innerHTML = days
}
displayDefaultCalender();



function showCalender() {
    let month, year, lastDay, firstDay;
    days = "";
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
        lastWeekDay = data.lastDay;
        displayCalender(firstDay, lastDay, lastWeekDay);
    }

    // console.log(firstDay) 
    // console.log(lastDay) 
    function displayCalender(firstDay, lastDay, lastWeekDay) {
        let j = 0;
        let monthDays = document.getElementById("tableRows")
        // let days = ""; 

        while (j < firstDay) {
            days += `<div class="grid-item"></div>`
            j++;
        }

        for (let i = 1; i <= lastDay; i++) {
            days += `<div class="grid-item" id="${i}">${i}</div>`
        }
        for (let i = lastWeekDay + 1; i <= 7; i++) {
            days += `<div class="grid-item"></div>`
        }
        monthDays.innerHTML = days
    }
    getData()
}

const currentCells = document.querySelectorAll(".grid-item");
const enterDate = document.getElementById("enterBtn");
const gridCell = document.getElementById("tableRows");
// const dateVal = document.getElementById("inputText").value;

// gridCell.addEventListener('click', (e) => {
//     let id = e.target.id;

//     enterDate.addEventListener('click', () => {
//         const dateVal = document.getElementById("inputText").value;
//         console.log(dateVal)
//         async function getDataForBg() {
//             let res = await fetch('http://localhost/calendar/colorBg.php/', {
//                 method: 'POST', headers: {
//                     'Content-Type': 'application/json',
//                 }, body: JSON.stringify({ "date": dateVal })
//             })
//             let data = await res.json();
//             console.log(data);
//             color = data.color;
//             setColor(color);
//         }
//         getDataForBg()

//         let curCell = document.getElementById(id);

//         function setColor(color) {
//             if (color == "green") {
//                 curCell.style.backgroundColor = "green";
//             } else {
//                 curCell.style.backgroundColor = "white";
//             }
//         }
//     })
// })




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
        selectedList = data.selectedDates;
        console.log(selectedList);
        setColor(color, selectedList);
    }

    function setColor(color, array) {
        const currentCells = document.querySelectorAll(".grid-item");
        for (let item of currentCells) {
            // console.log(item.id)
            array.map(cell => {
                if(cell){
                    if (item.id == cell) {
                        item.style.backgroundColor = "green";
                    }
                }
            })
        }
    }
    // const currentCells = document.querySelectorAll(".grid-item");
    // for (let item of currentCells) {
    //     // console.log(item.id)
    //     if (item.id == dateVal) {
    //         function setColor(color) {
    //             if (color == "green") {
    //                 item.style.backgroundColor = "green";
    //             } else {
    //                 item.style.backgroundColor = "white";
    //             }
    //         }
    //     }
    // }
    getDataForBg()
}


