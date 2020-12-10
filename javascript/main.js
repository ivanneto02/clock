class digitalClock {

    constructor() {
        this.currdate = new Date();
        document.getElementById("time").innerHTML = "Current date: <br>Current Time: ";
        this.iterate();
        this.millatary_time = false;
    }

    formatDate() {
        this.currdate = new Date();

        this.year = this.currdate.getFullYear();
        this.month = this.currdate.getMonth();
        this.day = this.currdate.getDay();

        return `${this.year}-${this.month}-${this.pad(this.day)}`;

    }

    formatTime() {
        this.currtime = new Date();

        this.hours = this.currtime.getHours();
        this.minutes = this.currtime.getMinutes();
        this.seconds = this.currtime.getSeconds();

        if(this.millatary_time) {
            return `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
        }
        
        return `${this.pad(this.formatHourM(this.hours))}:${this.pad(this.minutes)}:${this.pad(this.seconds)} ${this.determineMeridiem(this.hours)}`;
    }

    /*
    This function adds padding to a string, so that the length will always be 2.
    In a way, it replaces the python zfill function.
    */
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

    iterate() {
        document.getElementById("time").innerHTML = "Current date: " + this.formatDate() + "<br>" + "Current time: " + this.formatTime();       
        setTimeout(() => {
            this.iterate();
        }, 100);
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
        this.clearClock();
        this.drawCircle();
        this.drawMainLines();
        this.drawSecondLines();
        this.drawNumbers();
        this.drawSecondsHand();
        this.drawHoursHand();

        //every second, call iterate
        setTimeout(() => {
            this.iterate();
        }, 100);
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
            this.segmentX = this.centerX + (this.clockRadius)*(Math.cos(i*(Math.PI/180)));
            this.segmentY = this.centerY + (this.clockRadius)*(Math.sin(i*(Math.PI/180)));

            // Increate to moveTo() function
            this.moveToIncreaseX = (this.clockRadius - 20)*(Math.cos(i*(Math.PI/180)));
            this.moveToIncreaseY = (this.clockRadius - 20)*(Math.sin(i*(Math.PI/180)));

            // Draw the lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + this.moveToIncreaseX, this.centerY + this.moveToIncreaseY);
            this.ctx.lineTo(this.segmentX, this.segmentY);
            this.ctx.stroke();
        }
    }

    drawSecondLines() {
        
        // loops through clock every 30 degrees
        for (var i = 0; i < 12*30; i += 5) {
            // Segments to be printed
            this.segmentX = this.centerX + this.clockRadius*(Math.cos(i*(Math.PI/180)));
            this.segmentY = this.centerY + this.clockRadius*(Math.sin(i*(Math.PI/180)));

            // Increate to moveTo() function
            this.moveToIncreaseX = (this.clockRadius - 10)*(Math.cos(i*(Math.PI/180)));
            this.moveToIncreaseY = (this.clockRadius - 10)*(Math.sin(i*(Math.PI/180)));

            // Draw the lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + this.moveToIncreaseX, this.centerY + this.moveToIncreaseY);
            this.ctx.lineTo(this.segmentX, this.segmentY);
            this.ctx.stroke();
        }
    }

    drawNumbers() {
        for (var i = 30; i <= 12*30; i += 30) {
            // Set coordinates
            this.xCoord = 242 + (this.clockRadius - 35)*(Math.cos((i)*(Math.PI/180)));
            this.yCoord = 257 + (this.clockRadius - 35)*(Math.sin((i)*(Math.PI/180)));

            switch(i/30 + 3) {
                case 13:
                    this.ctx.strokeText(1, this.xCoord, this.yCoord);
                    continue;
                case 14:
                    this.ctx.strokeText(2, this.xCoord, this.yCoord);
                    continue;
                case 15:
                    this.ctx.strokeText(3, this.xCoord, this.yCoord);
                    continue;
            }

            this.ctx.strokeText(i/30 + 3, this.xCoord, this.yCoord);
        }
    }

    //returns what second of the day it is
    getTimeInSeconds(){
        //get date-time
        this.currtime = new Date();
        //return time in seconds
        return this.currtime.getHours() * 3600 + this.currtime.getMinutes() * 60 + this.currtime.getSeconds();
    }

    drawHoursHand(){
        //find x and y offset of the hours hand in relation to its starting position with respect to the 24 hour time in seconds
        this.u = this.getTimeInSeconds() % 43200;
        this.xOffsetHours = this.clockRadius / 2 * Math.cos((this.u - 43200 / 4) * 2 * Math.PI / 43200);
        this.yOffsetHours = this.clockRadius / 2 * Math.sin((this.u - 43200 / 4) * 2 * Math.PI / 43200); 
        //draw hours hand
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + this.xOffsetHours, this.centerY + this.yOffsetHours);
        this.ctx.stroke();

        document.getElementById("tester").innerHTML = this.u;
    }


    drawSecondsHand(){
        //find the x and y offset of the seconds hand in relation to its starting position with respect to the amount of seconds
        this.currtime = new Date();
        this.s = this.currtime.getSeconds();
        this.xOffsetSeconds = this.clockRadius * Math.cos((this.s - 15) * 2 * Math.PI / 60);
        this.yOffsetSeconds = this.clockRadius * Math.sin((this.s - 15) * 2 * Math.PI / 60);
        //draw seconds hand
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.centerX + this.xOffsetSeconds, this.centerY + this.yOffsetSeconds);
        this.ctx.stroke();
    }
}

class ticks {
    constructor() {
        return "FIXME";
    }

    iterate() {
        return "FIXME";
    }

    get image() {
        return "FIXME";
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




class alarm {
    constructor(variable) {
        switch(variable) {
            case 1:
                this.alarmTime = prompt("Set alarm length: ", "3");
                this.start();
            case 4: 
                this.alarmSnooze = prompt("Snooze for how long?", "5");
                this.alarmTime +=  this.alarmSnooze;
                this.snooze(); 
        }
    }

    start() {
        if (this.alarmTime !=null) {
            document.getElementById("alarmMessage").innerHTML = "Alarm time: " + this.alarmTime; 
        }
        console.log(this.alarmTime);
    }

    iterate() {
        function isRunning() {
        
        }
    }
    

    reset() {
        
    } 

    pause() {

    }

    snooze() {
        if (this.alarmTime !=null) {
            document.getElementById("alarmMessage").innerHTML = "Alarm time: " + this.alarmTime; 
        }
        console.log(this.alarmTime);
    }
    
}


// Object calls
const newClock = new digitalClock();
const newBaseClock = new baseClock();
const newStopwatch = new stopwatch();

// const myAlarm = new alarm(); 


