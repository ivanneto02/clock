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

        // Function to iterate
        this.iterThis = () => {
            document.getElementById("time").innerHTML = "Current date: " + this.formatDate() + "<br>" + "Current time: " + this.formatTime();
            console.log('test');
        }

        // Call iterThis every second
        setInterval(this.iterThis, 1000);
    }
}

class baseClock {
    
    constructor() {
        
        // Clock variables 
        this.clockRadius = 220; 
        
        // C is the canvas
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        this.ctx.font = "20px Arial";

        // Function calls
        this.drawCircle();
        this.drawMainLines();
        this.drawSecondLines();
        this.drawNumbers();
    }

    drawCircle() {
        // Draw the circle
        this.ctx.beginPath();
        this.ctx.arc(250, 250, this.clockRadius, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    drawMainLines() {
        
        // loops through clock every 30 degrees
        for (var i = 0; i < 12*30; i += 30) {
            // Segments to be printed
            this.segmentX = 250 + (this.clockRadius)*(Math.cos(i*(Math.PI/180)));
            this.segmentY = 250 + (this.clockRadius)*(Math.sin(i*(Math.PI/180)));

            // Increate to moveTo() function
            this.moveToIncreaseX = (this.clockRadius - 20)*(Math.cos(i*(Math.PI/180)));
            this.moveToIncreaseY = (this.clockRadius - 20)*(Math.sin(i*(Math.PI/180)));

            // Draw the lines
            this.ctx.beginPath();
            this.ctx.moveTo(250 + this.moveToIncreaseX, 250 + this.moveToIncreaseY);
            this.ctx.lineTo(this.segmentX, this.segmentY);
            this.ctx.stroke();
        }
    }

    drawSecondLines() {
        
        // loops through clock every 30 degrees
        for (var i = 0; i < 12*30; i += 5) {

            // Do not draw over main lines
            if (i % 30 == 0) {
                continue;
            }
            
            // Segments to be printed
            this.segmentX = 250 + this.clockRadius*(Math.cos(i*(Math.PI/180)));
            this.segmentY = 250 + this.clockRadius*(Math.sin(i*(Math.PI/180)));

            // Increate to moveTo() function
            this.moveToIncreaseX = (this.clockRadius - 10)*(Math.cos(i*(Math.PI/180)));
            this.moveToIncreaseY = (this.clockRadius - 10)*(Math.sin(i*(Math.PI/180)));

            // Draw the lines
            this.ctx.beginPath();
            this.ctx.moveTo(250 + this.moveToIncreaseX, 250 + this.moveToIncreaseY);
            this.ctx.lineTo(this.segmentX, this.segmentY);
            this.ctx.stroke();
        }
    }

    drawNumbers() {
        for (var i = 30; i <= 12*30; i += 30) {
            // Set coordinates
            this.xCoord = 242 + (this.clockRadius - 35)*(Math.cos((i)*(Math.PI/180)));
            this.yCoord = 257 + (this.clockRadius - 35)*(Math.sin((i)*(Math.PI/180)));

            // Replace 13, 14, 15 with 1, 2, 3
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


