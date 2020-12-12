class digitalClock {

    constructor() {
        this.currdate = new Date();
        document.getElementById("time").innerHTML = "Current date: <br>Current Time: ";
        this.iterate();
        this.millatary_time = false;
    }

    formatDate() {
        this.currdate = new Date();

        // Gets local date
        this.locDate = this.currdate.toLocaleDateString();

        return `${this.locDate}`;
    }

    formatTime() {
        this.currtime = new Date();
        
        this.locTime = this.currtime.toLocaleTimeString();

        return `${this.locTime}`;
        
        /*
        this.hours = this.currtime.getHours();
        this.minutes = this.currtime.getMinutes();
        this.seconds = this.currtime.getSeconds();

        if(this.millatary_time) {
            return `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
        }
        
        return `${this.pad(this.formatHourM(this.hours))}:${this.pad(this.minutes)}:${this.pad(this.seconds)} ${this.determineMeridiem(this.hours)}`;
        */
    }

    /*
    This function adds padding to a string, so that the length will always be 2.
    In a way, it replaces the python zfill function.
    */
   /*
    pad(input) {
        let value = input.toString();

        if(value.length < 2 && value.length !=0) {
            return "0" + value;
        }
        return value;
    }

    determineMeridiem(hour) {
        if(hour<12 && hour >= 0) {
            return "AM";
        }
        return "PM";
    }

    formatHourM(hour) {
        if(hour>12) {
            return hour-=12;
        }
        return hour;
    }
    */

    iterate() {
        // Function to iterate
        this.iterThis = () => {
            document.getElementById("time").innerHTML = "Current date: " + this.formatDate() + "<br>" + "Current time: " + this.formatTime();
        }

        this.iterThis();
        // Call iterThis every second
        setInterval(this.iterThis, 1000);
    }
}

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
            this.drawSecondsHand();
            this.drawMinutesHand();
            this.drawHoursHand();
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
        this.ctx.arc(this.centerX, this.centerY, this.clockRadius, 0, 2*Math.PI);
        this.ctx.stroke();
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
            this.ctx.stroke();
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
            let moveToIncreaseX = (this.clockRadius - 10)*(Math.cos(i*(Math.PI/180)));
            let moveToIncreaseY = (this.clockRadius - 10)*(Math.sin(i*(Math.PI/180)));

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
        let u = this.getTimeInSeconds() % 43200;
        let xOffsetHours = this.clockRadius / 2 * Math.cos((u - 43200 / 4) * 2 * Math.PI / 43200);
        let yOffsetHours = this.clockRadius / 2 * Math.sin((u - 43200 / 4) * 2 * Math.PI / 43200); 

        //draw hours hand
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + xOffsetHours, this.centerY + yOffsetHours);
        this.ctx.stroke();
    }

    drawSecondsHand(){
        //find the x and y offset of the seconds hand in relation to its starting position with respect to the amount of seconds
        let currtime = new Date();
        let s = currtime.getSeconds();
        let xOffsetSeconds = this.clockRadius * Math.cos((s - 15) * 2 * Math.PI / 60);
        let yOffsetSeconds = this.clockRadius * Math.sin((s - 15) * 2 * Math.PI / 60);

        //draw seconds hand
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + xOffsetSeconds, this.centerY + yOffsetSeconds);
        this.ctx.stroke();
    }

    drawMinutesHand() {
        // New date object and get current minutes
        let currtime = new Date();
        let minutes = currtime.getMinutes();

        // Define vector
        let segmentX = this.centerX + this.clockRadius * Math.cos((minutes - 15) * Math.PI / 180);
        let segmentY = this.centerY + this.clockRadius * Math.sin((minutes - 15) * Math.PI / 180);

        // Draw minutes hand
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(segmentX, segmentY);
        this.ctx.stroke();
    }
}

class stopwatch {
    constructor() {
        this.text = "Changed!";
        this.isRunning = false;
        this.startTime;
        this.endTime;
        this.duration = 0;
        this.display_duration = 0;
    }

    iterate() {
        this.sleep(100);
        if(this.isRunning) {
            
            this.iterateTime = new Date();
            this.display_seconds =  (this.iterateTime.getTime() - this.startTime.getTime()) / 1000;
            this.display_duration = this.display_duration + this.display_seconds;
            console.log(this.startTime.getTime());
            this.display_duration = this.display_duration.toFixed(2);
            document.getElementById("stopwatch").innerHTML="Stopwatch:\n" + this.display_duration;
            this.display_duration = 0;
            //for some reason you need to use recurison in order for the browser tab to not crash, no idea why but it works man
            setTimeout(() => {
                this.iterate();
            }, 1);
        }
    }

    start() {
        document.getElementById("stopwatch").innerHTML="Stopwatch:<br>Started!"
        if(this.isRunning) {
            console.log("this is already running");
            return;
        }
        else {
            this.isRunning = true;
            this.startTime = new Date();
            this.iterate();
        }

        
    }
    
    stop() {

        if(!this.isRunning) {
            console.log("This should NOT be running - logic error");
            return;
        }
        this.isRunning = false;
        this.endTime = new Date();
        this.seconds =  (this.endTime.getTime() - this.startTime.getTime()) / 1000;
        this.duration = this.duration + this.seconds;
        this.duration = this.duration.toFixed(2);
        document.getElementById("stopwatch").innerHTML="Stopwatch:\n" + this.duration.toString();

        
    }

    reset() {
        this.duration = 0;
        this.startTime, this.endTime = null, null;
        this.isRunning = false;
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

      formatTime(input) {
          return -1;
          //TODO!!!
      }
}

class Timer {
    constructor() {
        // Define local vars
        let hr = parseInt(document.getElementById("hour").value);
        let min = parseInt(document.getElementById("minute").value);
        let sec = parseInt(document.getElementById("second").value);
    

        
        // Define total seconds for user input
        this.totalSeconds = (hr*60*60) + (min*60) + sec;
    
        this.iterate();
    }

    // Formats numbers to be two digits
    pad(input) {
        let value = input.toString();

        if(value.length < 2 && value.length !=0) {
            return "0" + value;
        }
        return value;
    }

    startFunction() {

        // Hours
        if (this.totalSeconds >= 3600) {
            this.hour = Math.floor(this.totalSeconds/60/60);
        } else if (this.totalSeconds < 3600) {
            this.hour = 0; 
        }

        // Minutes
        if (this.totalSeconds >= 60) {
            this.minute = Math.floor(this.totalSeconds/60)%60;
        } else if (this.totalSeconds < 60) {
            this.minute = 0; 
        }

        // Seconds
        if (this.totalSeconds >= 0) {
            this.seconds = this.totalSeconds%60; 
        }
    
        // Time format
        if (this.totalSeconds >= 0) {
            --this.totalSeconds;
            document.getElementById("timer").innerHTML = `<div>Timer: <br> ${this.pad(this.hour)}:${this.pad(this.minute)}:${this.pad(this.seconds)} </div>`;
        }
        else if (this.totalSeconds <= 0) {
            document.getElementById("timer").innerHTML = "Finished!";
            clearInterval();
        }
    }

    iterate() {
        this.iterThis = () => {
            this.startFunction();
        }

        this.iterThis();
        // Iterate
        setInterval(this.iterThis, 1000);
    }
}

function pauseFunction() {
    return;
}

function restartFunction() {
    return;
}

// Object calls
const newClock = new digitalClock();
const newBaseClock = new baseClock();
const newStopwatch = new stopwatch();

// const myAlarm = new alarm(); 


