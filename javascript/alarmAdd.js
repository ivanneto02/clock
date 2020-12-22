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


class allAlarms{
    constructor(){
        if(window.localStorage.getItem("numAlarms") === null){
            window.localStorage.setItem("numAlarms", 0);
        }
    }
    formatTime(){
        let hr = document.getElementById("hour").value;
        let min = document.getElementById("minute").value;
        if(hr > 12 || hr < 1 || min > 59 || min < 1){
            return "Invalid input"
        }
        if (min > 9){
            return  hr + ":" + min;
        }
        return hr + ":0" + min;
    }
    createNewAlarm(){
        if (this.formatTime() === "Invalid input"){
            document.getElementById("addAlarmTester").innerHTML = "Invalid Time";
            return;
        }
        else{
            var string = this.formatTime();
        }
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
