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
const daysOfTheWeek = ["Mon","Tue","Wed","Thu","Fri","Sa","Sun"]

const month_lbl = document.getElementById("month");
const mainDiv = document.getElementById("div");

let monthIndex = 9;

GenerateCalendar(monthIndex);

  
//TODO possible logical error with modulo
function NextMonth(){
  let nextMonth = (monthIndex+1)%12;
  monthIndex = nextMonth;
  GenerateCalendar(monthIndex);
    
}

function PrevMonth(){
  let prevMonth = (monthIndex-1)%11;

  if (prevMonth==-1) {
    prevMonth=11;
  }

  monthIndex = prevMonth;

  GenerateCalendar(monthIndex);
}

function GenerateCalendar(monthIndex){
  console.log(monthIndex)
  month_lbl.innerHTML = GetMonthName(monthIndex);

  //deletes every child of mainDiv
  while(mainDiv.lastElementChild){
    mainDiv.removeChild(mainDiv.lastElementChild);
  }

  for(let i=1;i<GetDaysInMonth(monthIndex)+1;i++){

    //create some space
    AddSpace();

    if(i%7==0){
      //create new line 
      AddLineBreak();
    }
    
    let day = '' + i;

    let weekDay = GetWeekDay(i,monthIndex);

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
    
    btn.style.innerRadius = "3px";
    
    label.innerHTML = btn_label;

    div_lbl.innerHTML = div_label;
    div.style.placeItems = "center";

    div.style.height = "30px";
    div.style.width = "30px";
    div.style.backgroundColor= "white";
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

function GetWeekDay(day,month){
  let date_str = "2025-"+month+"-"+day;
  let date = new Date(date_str);

  // 0 1 2 3 4 5 6 
  // So Mon Di Mi Thu Fr Sa
  let index = (date.getDay()-1)%7;
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

