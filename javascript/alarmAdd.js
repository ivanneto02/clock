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
    #formatTime(){
        //# means this is a private method
        var time = this.#futureTime();
        let name = document.getElementById("name").value;
        // get name 
        return  time + "|" + name;

    }
    
    #futureTime(){
        //Handles getting an alarm time that is on the correct day
        var futureTime = this.#getCorrectTime(0); 
        var currentTime = this.#currentTime();
        document.getElementById("tester").innerHTML = futureTime - currentTime;

        //if alarm should be set to the next day
        if (futureTime <= currentTime) { 
            // adds a day to correctTime 
            return (this.#getCorrectTime(1));
        }
        //else
        else {
            return futureTime;
        }
    }

    #getCorrectTime(nextDay){
        //get current date from forms
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        if (nextDay){
            dd ++;
        }
        //Get time from forms
        let hr = document.getElementById("hour").value;
        if (document.getElementById("AMPMButton").value === "PM"){
            hr += 12;
        }
        let min = document.getElementById("minute").value;
        // if (hr > 25 || hr < 1 || min > 59 || min < 0){
        //     return "Invalid input";
        // }
        
        var alarmDate = new Date(yyyy, mm, dd, hr, min, 0, 0); // object that represents the date and time from forms

        var time = alarmDate.getTime() // will give us the milliseconds since Jan 1, 1970 00:00:00 UTC to our alarmDate
        return time / 1000;
    }
    timeInSeconds(hr, min, sec){
        return hr * 360 + min * 60 + sec;
    }

    #currentTime() {
        const now = new Date(); // object that represents the current date and time 

        const time = now.getTime(); // will give us the milliseconds since Jan 1, 1970 00:00:00 UTC to the actual date
        return Math.floor(time / 1000);    
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
}

function switchAMPM(){
    if (document.getElementById("AMPMButton").innerHTML === "AM"){
        document.getElementById("AMPMButton").innerHTML = "PM";
        document.getElementById("AMPMButton").value = "PM";
    }
    else{
        document.getElementById("AMPMButton").innerHTML = "AM";
        document.getElementById("AMPMButton").value = "AM";
    }
}
