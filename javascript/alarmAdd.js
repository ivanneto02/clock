window.localStorage;

class baseClock {
    constructor() {
        // Clock variables 
        this.clockRadius = 220; 
        this.centerX = 250;
        this.centerY = 250;
        
        // C is the canvas
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        this.ctx.font = "20px Arial";

        // Function calls
        this.iterate();
    }

    //every second, clears the clock then redraws
    iterate() {
        this.iterThis = () => {
            this.clearClock();
            this.drawCircle();
            this.drawMainLines();
            this.drawSecondLines();
            this.drawNumbers();
            this.drawMinutesHand();
            this.drawHoursHand();
            this.drawSecondsHand();
        }

        this.iterThis();
        //every second, call iterate
        setInterval(this.iterThis, 1000);
    }

    clearClock() {
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.clockRadius+1, 0, 2*Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
    }

    drawCircle() {
        // Draw the circle
        this.ctx.beginPath();
        this.ctx.lineWidth = 7;
        this.ctx.strokeStyle = "gray";
        this.ctx.arc(this.centerX, this.centerY, this.clockRadius, 0, 2*Math.PI);
        this.ctx.stroke();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
    }

    drawMainLines() {
        
        // loops through clock every 30 degrees
        for (var i = 0; i < 12*30; i += 30) {
            // Segments to be printed
            let segmentX = this.centerX + (this.clockRadius)*(Math.cos(i*(Math.PI/180)));
            let segmentY = this.centerY + (this.clockRadius)*(Math.sin(i*(Math.PI/180)));

            // Increate to moveTo() function
            let moveToIncreaseX = (this.clockRadius - 20)*(Math.cos(i*(Math.PI/180)));
            let moveToIncreaseY = (this.clockRadius - 20)*(Math.sin(i*(Math.PI/180)));

            // Draw the lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + moveToIncreaseX, this.centerY + moveToIncreaseY);
            this.ctx.lineTo(segmentX, segmentY);

            this.ctx.lineWidth = 10;
            this.ctx.stroke();
            this.ctx.lineWidth = 3;
        }
    }

    drawSecondLines() {

        // loops through clock every 30 degrees
        for (var i = 0; i < 12*30; i += 6) {

            // Do not draw over main lines
            if (i % 30 == 0) {
                continue;
            }
            
            // Segments to be printed
            let segmentX = this.centerX + this.clockRadius*(Math.cos(i*(Math.PI/180)));
            let segmentY = this.centerY + this.clockRadius*(Math.sin(i*(Math.PI/180)));

            // Increate to moveTo() function
            let moveToIncreaseX = (this.clockRadius - 12)*(Math.cos(i*(Math.PI/180)));
            let moveToIncreaseY = (this.clockRadius - 12)*(Math.sin(i*(Math.PI/180)));

            // Draw the lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + moveToIncreaseX, this.centerY + moveToIncreaseY);

            this.ctx.lineTo(segmentX, segmentY);
            this.ctx.stroke();
        }
    }

    drawNumbers() {
        for (var i = 30; i <= 12*30; i += 30) {
            // Set coordinates
            let xCoord = 242 + (this.clockRadius - 35)*(Math.cos((i)*(Math.PI/180)));
            let yCoord = 257 + (this.clockRadius - 35)*(Math.sin((i)*(Math.PI/180)));

            this.ctx.lineWidth = 2;

            // Replace 13, 14, 15 with 1, 2, 3
            switch(i/30 + 3) {
                case 13:
                    this.ctx.strokeText(1, xCoord, yCoord);
                    continue;
                case 14:
                    this.ctx.strokeText(2, xCoord, yCoord);
                    continue;
                case 15:
                    this.ctx.strokeText(3, xCoord, yCoord);
                    continue;
            }

            this.ctx.strokeText(i/30 + 3, xCoord, yCoord);
        }
    }

    //returns what second of the day it is
    getTimeInSeconds(){
        //get date-time
        let currtime = new Date();

        //return time in seconds
        return currtime.getHours() * 3600 + currtime.getMinutes() * 60 + currtime.getSeconds();
    }

    drawHoursHand(){
        //find x and y offset of the hours hand in relation to its starting position with respect to the 24 hour time in seconds
        let hours = this.getTimeInSeconds() % 43200;

        // Define vectors
        let xOffsetHours = this.clockRadius / 2 * Math.cos((hours - 43200 / 4) * 2 * Math.PI / 43200);
        let yOffsetHours = this.clockRadius / 2 * Math.sin((hours - 43200 / 4) * 2 * Math.PI / 43200); 

        // Define backward vectors
        let xBackward = (-1) * (this.clockRadius - 200) * Math.cos((hours - 43200 / 4) * 2 * Math.PI / 43200);
        let yBackward = (-1) * (this.clockRadius - 200) * Math.sin((hours - 43200 / 4) * 2 * Math.PI / 43200);

        // Draw hours hand
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        
        // Draw forward vector
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + xOffsetHours, this.centerY + yOffsetHours);

        // Draw backward vector
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + xBackward, this.centerY + yBackward);

        this.ctx.stroke();
    }

    drawSecondsHand(){
        //find the x and y offset of the seconds hand in relation to its starting position with respect to the amount of seconds
        let currtime = new Date();
        let seconds = currtime.getSeconds();

        // Define forward vector
        let xOffsetSeconds = this.clockRadius * (9/10) * Math.cos((seconds - 15) * 2 * Math.PI / 60);
        let yOffsetSeconds = this.clockRadius * (9/10) * Math.sin((seconds - 15) * 2 * Math.PI / 60);

        // Define backward vector
        let xBackward = (-1)*(this.clockRadius - 190) * (9/10) * Math.cos((seconds - 15) * 2 * Math.PI / 60);
        let yBackward = (-1)*(this.clockRadius - 190) * (9/10) * Math.sin((seconds - 15) * 2 * Math.PI / 60);

        // Draw seconds hand
        this.ctx.beginPath();

        // Draw foward part
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + xOffsetSeconds, this.centerY + yOffsetSeconds);

        // Draw backward part
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + xBackward, this.centerY + yBackward);

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        this.ctx.lineWidth = 3;
    }

    drawMinutesHand() {
        // New date object and get current minutes
        // let currtime = new Date();
        // let minutes = currtime.getMinutes();
        let seconds = this.getTimeInSeconds() % 3600;

        // Define vector
        let segmentX = this.centerX + (this.clockRadius - 40) * Math.cos((0.1*seconds - 90) * Math.PI / 180);
        let segmentY = this.centerY + (this.clockRadius - 40) * Math.sin((0.1*seconds - 90) * Math.PI / 180);

        // Define backward vector
        let xBackward = this.centerX - (this.clockRadius - 200) * Math.cos((0.1*seconds - 90) * Math.PI / 180);
        let yBackward = this.centerY - (this.clockRadius - 200) * Math.sin((0.1*seconds - 90) * Math.PI / 180);

        // Draw minutes hand
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(segmentX, segmentY);
        this.ctx.lineTo(xBackward, yBackward);

        this.ctx.lineWidth = 7;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.lineWidth = 3;
    }
}


/* 
const now = new Date(); // object that represents the current date and time 
const time = now.getTime(); // will give us the milliseconds since Jan 1, 1970 00:00:00 UTC

console.log(time); // 1607623412132

*/
/*

current time = 12:54pm (dec 22, 2020)

input: 1:30pm (dec 22, 2020)

SAME TIME OR PRIOR WILL HAVE NEXT DAY
input: 5:54am (dec 23, 2020)
input: 12:54pm (dec 23, 2020)


user options:
name, 
hour, minute, am/pm 

UI 
text box for name (can input anything but "|")
text box (input form) for hour/minute 
am/pm button 

submit button 

default alarm settings: current time 
    - prevents error message 

Add alarm 
    - once added, bring back to main page 

Reset
    - bring back to default alarm settings 

remove all button on main page 

constraints for input 
- can only input numbers, no special characters or letters 
- within range of 1-12 (for hours) 
- within range of 0-59 (for minutes)
    - no negative numbers 
    - drop down menu with 


            hours   minutes        am/pm
            3       28
            4       29
current     5       30              am 
            6       31
            7       x32

            hours 
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 ___
|   |
| 6 |   
|___|

div 
    array 
    1
    2
    3
    4


for (i = 0; i < 12; i++) {
    current hour = i;

}
- be able to input numbers (type) or button to scroll through 

--------
constraints: 
can't have an alarm for a time that already passed 
can't set alarm time that's before or at current time 

if pm and other is am
    - set alarm for next day


current time = 1:03pm 
    set alarm: 1:30pm
        alarm in 27 minutes 
        would not be alarm the next day at 1:30pm 
            but you can set it to reoccur 
            and you can choose what days of the week it will reoccur on 


REOCCURING ALARMS 
morning of tusday: 9:59am 
set alarm for 8am everyday 
set alarm for 8am monday, tuesday, thursday, friday ( every week )

set alarm for 10am wednesday ( every week )



----------

const d = new Date('February 02, 2020 01:02:03');

console.log(d.getTime()); // 1580634123000


future date in seconds

current time in seconds 
    iterate, to make sure this is current 

future - current = time in between 

time in between == 0 
    alarm sound 
    clear alarm 
        or you can snooze 
            snooze = add time to alarm 




adds an alarm localstorage

method {
    goes thru all alarms
    if the futuretime-currenttime === 0
    set off alarm
}

- you can't set an alarm for a time that already exists // no 
- or, you can set an alarm for a time that already exists, but you'll only get the notification for the first alarm 
    - or combine notifications 
- or, you'll get the notifications staggered 
    and you can snooze each one individually 



multiple alarms set to the same time 
- reoccuring alarms that overlap 
- have an individual alarm set at the same time as a reoccuring alarm 

reoccuring alarm at 8am (school)

winter break: 
    - 8am alarm (doctors appointment)
    - 8am reoccurring alarm (off)
        setting new alarm at 8am

set alarm for 3pm (buy apples)
    - snooze alarm, be reminded to buy apples again 
set alarm for 3pm (go to the store)
    - clear alarm (you're already going to the store)


------------
windows alarm system 

- set alarm for 8am
- alarm for 9am 
- alarm goes off if computer is on 
- log in at 10am
- notification for alarm at 8am (dismiss/snooze), then alarm for 9am 
    - snooze, you get another alarm 5 minutes later from current time 



alarm: based on time 
- future time - current time 



timer: based on user input 
- sets timer for 1 minute 
- 1 minute = 60 seconds 
    - iterate every second
    - timer goes off after 60 seconds 
    - counts down after 


add alarm: 
checks other alarms for time (order chronologically)
- if alarm is earlier than the others, it goes above them, otherwise it goes underneath 

sorting arrays: 
give an alarm a number based on time: 
num = future time - current time 
- further away in the future, the bigger the number
- sort the alarms based on num

alarm:
[alarm1, alarm2, alarm3]
{0: time, 1: time, numalarms: 2}


alarm1 :
time = num 
name = "go outside"
time = to_string(num) 

alarm2 :
time2 = num2 
name2 = "go inside"
time2 = to_string(num2) 

{0: time, 1: time2, 2: time3}
{0: name, 1: name2, 2: name3}


{1: time2, 2: time3, 0: time} = sorting steps = 1, 2 (switch 0 and 1; switch 1 and 2) 
    record sorting steps 
    sort other array by same steps 

{1: name2, 2: name3, 0: name2} = same sorting steps = 1, 2 (switch 0 and 1, switch 1 and 2)

{1: time2, 0: time, 2: time3} = sorting step = 1
{1: name2, 0: name, 2: name3} = same sorting step 
            alarm1



{0: time1|name1, 1: time2|name2}           

{0: "time|name1", 1: "time2|name2", "numAlarms": 2}

no | in your alarms 

s.find("|")

name[]
time[]
for ( int i = 0 ; i < numAlarms; i++ ){
    numAlarm's time = (s.substring 0: indexOfPipe)
    numAlarm's name = (s.substring indexOfPipe: length)
    
    name.push_back(numAlarm's name)
    time.push_back(numAlarm's time)
}

string_to_int(time) 

[time, time2] = sort integers 
 
["name1", "name2"] = same sorting steps 
            
time aray       [time 1, time 2, time 3]
name array      [name 1, name 2, name 3]



sorting by time (smallest to largest)
{alarm1: time1, alarm2: time}

but if time === 
sort by input order or name


alarm1:
    name1
    time1

alarm2: 
    name2
    time2

    sort by time
        if time1 == time2: 
            sort by input order
            sort by name 


print to the page after sorting





*/
/*
const now = new Date(); // object that represents the current date and time 
const time = now.getTime(); // will give us the milliseconds since Jan 1, 1970 00:00:00 UTC

console.log(time); // 1607623412132
*/



class allAlarms{
    constructor(){
        if(window.localStorage.getItem("numAlarms") === null){
            window.localStorage.setItem("numAlarms", 0);
        }
    }
    createNewAlarm(){
        // gets the time formatted from the input boxes
        if (this.#formatTime() === "Invalid input"){
            document.getElementById("addAlarmTester").innerHTML = "Invalid Time";
            return;
        }
        else{
            var string = this.#formatTime();
        }
        //Adds correct time to dictionary in localstorage
        window.localStorage.setItem(window.localStorage.getItem("numAlarms"), string);

        var numAlarms = parseInt(window.localStorage.getItem("numAlarms"));
        window.localStorage.setItem("numAlarms", numAlarms + 1);
        document.getElementById("addAlarmTester").innerHTML = "Added  alarm for " + string;    
    }

    showAlarm(num){
        var time = window.localStorage.getItem(num);
        // create a new div element
        const newDiv = document.createElement("div");
        // and give it the alarm's text 
        const newContent = document.createTextNode("Alarm " + time);
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
        // add the div to the alarmSection
        document.getElementById("addAlarmTester").appendChild(newDiv);
    }
    #formatTime(){
        //# means this is a private method
        //WORKING CODE (PRIOR TO CHANGES)
        //TODO format with the name also separated by |
       let hr = document.getElementById("hour").value; //==========================================================EDIT THIS!=============
       let min = document.getElementById("minute").value;
       let name = document.getElementById("name").value;
       // get name 

       if (hr > 12 || hr < 1 || min > 59 || min < 0){
           return "Invalid input";
       }

        if (min > 9){
            return  this.timeInSeconds(hr, min, 0) + "|" + name;
        }
        return  this.timeInSeconds(hr, min, 0) + "|" + name;

    }
    #formatTime2(){

    }
    futureTime(){
        var futureTime = getCorrectTime(0);
        var currentTime = currentTime();
        //if alarm should be set to the next day
        if (futureTime <= current) { 
            // adds a day to correctTime
            return (getCorrectTime(1));
        }
        //else
        else {
            return futureTime;
        }
    }

    getCorrectTime(nextDay){  
        //adds the alarm to localstorage
        let hr = document.getElementById("hour").value;//==========================================================EDIT THIS!=============
        let min = document.getElementById("minute").value;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
        if (nextDay){
            dd ++;
        }
        //document.write(today);
        document.getElementById("tester").innerHTML = today; 

        // const now = new Date(); // object that represents the current date and time 
        var alarmDate = new Date(yyyy, mm, dd, hr, min, 0, 0);
        var time = alarmDate.getTime() // will give us the milliseconds since Jan 1, 1970 00:00:00 UTC to our alarmDate
        var hours = Math.floor(time / 1000 / 60 / 60) % 24;
        var minutes =  Math.floor(time / 1000 / 60) % 60;
        var seconds = Math.floor(time / 1000) % 60;

        return(this.timeInseconds(hours, minutes, seconds));

    }
    
    timeInSeconds(hr, min, sec){
        return hr * 360 + min * 60 + sec;
    }

    #currentTime() {
        const now = new Date(); // object that represents the current date and time 
        const time = now.getTime(); // will give us the milliseconds since Jan 1, 1970 00:00:00 UTC 
        var hours = Math.floor(time / 1000 / 60 / 60) % 24;
        var minutes =  Math.floor(time / 1000 / 60) % 60;
        var seconds = Math.floor(time / 1000) % 60;
        
        return this.timeInseconds(hours, minutes, seconds);
        // want to return hours: minutes
        // check by seconds 

        // time = 5:50pm 
        // time = 5:50.00
         
    }
    
    // call this function every second in the alarms js
    checkIfAlarmsShouldGoOff(){
        //todo
        // for(var i = 0; i < parseInt(localStorage.getItem("numAlarms")); i ++){
        //     var futureTime = 
        //     var currentTime = 
        //     if (
        // }

    }

    


}

const alarms = new allAlarms();
  


function newAlarm(){
   //alarms.showAlarms();
   alarms.createNewAlarm();
}

function removeAlarms(){
    window.localStorage.clear();
    window.localStorage.setItem("numAlarms", 0);
    document.getElementById("addAlarmTester").innerHTML = "";
}

function printAllAlarms(){
    for(var i = 0; i < parseInt(window.localStorage.getItem("numAlarms")); i ++){
        alarms.showAlarm(i)
    }
}
function tester(){
    alarms.futureTime();
}

// function switchAMPM(){
//     document.getElementById("AMPMButton").innerHTML = "PM";   
//     if (document.getElementById("AMPMButton").innerHTML === "AM"){
//         document.getElementById("AMPMButton").innerHTML = "PM";
//     }
// }
