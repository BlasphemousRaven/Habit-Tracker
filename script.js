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

const mainDiv = document.getElementById("div");

GenerateCalendar();


function GenerateCalendar(){
  for(let i=1;i<GetDaysInMonth()+1;i++){

    //create some space
    AddSpace();

    if(i%7==0){
      //create new line 
      AddLineBreak();
    }
    
    let day = '' + i;
    let weekDay = GetWeekDay(i);
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

function GetDaysInMonth(){
  return daysInMonths.get(GetMonth());
}

function GetMonth(){
  let monthIndex = new Date().getMonth(); 
  let monthName = monthNames[monthIndex]; 
  return monthName;
}

function GetWeekDay(day){
  let month = new Date().getMonth();
  let str = "2025-" + month + "-" + day;
  let date = new Date(str);
  let index = date.getDay(); 

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

function NextMonth(){
 console.log("next") 
}

function PrevMonth(){

 console.log("prev") 
}
