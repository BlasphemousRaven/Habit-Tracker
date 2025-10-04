const daysInMonths = new Map([
  ["January",31],
  ["February",28],
  ["March",31],
  ["April",30],
  ["May",31],
  ["June",30],
  ["July",31],
  ["August",31],
  ["September",30],
  ["October",31],
  ["November",30],
  ["December",31],
]);

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const daysOfTheWeek = ["Mo","Di","Mi","Do","Fr","Sa","So"]

const month_lbl = document.getElementById("month");
const year_lbl = document.getElementById("year");

const mainDiv = document.getElementById("div");

let date = new Date();
let monthIndex = date.getMonth();
let year = date.getYear()+1900;

GenerateCalendar(monthIndex,year);

  
//TODO possible logical error with modulo
function NextMonth(){
  let nextMonth = (monthIndex+1)%12;
  monthIndex = nextMonth;

  if(GetMonthName(monthIndex)=="January"){
    year+=1;
  }

  GenerateCalendar(monthIndex,year);
    
}

function PrevMonth(){
  let prevMonth = (monthIndex-1)%11;

  if (prevMonth==-1) {
    prevMonth=11;
  }

  monthIndex = prevMonth;
  if(GetMonthName(monthIndex)=="December"){
    year-=1;
  }
  GenerateCalendar(monthIndex,year);
}

function GenerateCalendar(monthIndex,year){
  year_lbl.innerHTML = year;

  month_lbl.innerHTML = GetMonthName(monthIndex);

  //deletes every child of mainDiv to clear out screen
  while(mainDiv.lastElementChild){
    mainDiv.removeChild(mainDiv.lastElementChild);
  }

  let daysInMonth = GetDaysInMonth(monthIndex);
  //handle february leap year
  if(GetMonthName(monthIndex)=="February" && year%4==0){
    daysInMonth = 29;
  }

  //creates as many buttons as days in months
  for(let i=1;i<daysInMonth+1;i++){

    //create some space
    AddSpace();

    //if 7 elements are in one row we want to add a line break
    if(i%7==0){
      //create new line 
      AddLineBreak();
    }
    
    //creates button and adds it to main div
    let day = '' + i;
    let weekDay = GetWeekDay(i,monthIndex,year);
    let btn = CreateButton(day,weekDay);  
    mainDiv.appendChild(btn);
  }
}

function AddSpace(){
    let txt = document.createElement("label");
    txt.innerHTML= " ";
    mainDiv.appendChild(txt);
}

function AddLineBreak(){
  let p = document.createElement("p");
  mainDiv.appendChild(p);
}


function CreateButton(btn_label, div_label){
    let btn = document.createElement("button");
    let div = document.createElement("div");
    let div_lbl = document.createElement("label");
    let label = document.createElement("label");
    
    
    label.innerHTML = btn_label;

    div_lbl.innerHTML = div_label;

    div.style.placeItems = "center";
    div.style.height = "30px";
    div.style.width = "30px";
    div.style.backgroundColor= "white";
    div.style.borderRadius = "3px"

    div.appendChild(div_lbl);

    btn.appendChild(label);
    btn.appendChild(div);
    btn.setAttribute("onClick","ChangeColor(this)");

    return btn;
}

//returns amount of days in month as INT
function GetDaysInMonth(monthIndex){
    let monthName = GetMonthName(monthIndex);
    return daysInMonths.get(monthName);    
}

function GetMonthName(monthIndex){
  return monthNames[monthIndex];
}

function GetWeekDay(day,month,year){
  let date_str = year+"-"+month+"-"+day;
  let date = new Date(date_str);

  let index = (date.getDay()+1)%7;
  //because JavaShit chooses -1 over 6 when calculating modulo...
  if(index==-1){
    index = 6;
  } 

  return daysOfTheWeek[index];
}


function ChangeColor(button) { 
  let obj = button.children[1];
  let color = obj.style.backgroundColor;

  if(color=="white"){
      obj.style.backgroundColor = "lightgreen";
  }
  else{
      obj.style.backgroundColor = "white";
  }
}

