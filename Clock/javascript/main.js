class clock {

    constructor() {
        this.currdate = new Date();
        document.getElementById("time").innerHTML = "Current date: <br>Current Time: ";
        this.iterate();
    }

    formatDate() {
        this.currdate = new Date();

        this.year = this.currdate.getFullYear();
        this.month = this.currdate.getMonth();
        this.day = this.currdate.getDay();

        return `${this.year}-${this.month}-${this.day}`;
        //return this.currdate.format("hh:mm:ss tt");
    }

    formatTime() {
        this.currtime = new Date();

        this.hours = this.currtime.getHours();
        this.minutes = this.currtime.getMinutes();
        this.seconds = this.currtime.getSeconds();

        return `${this.pad(this.formatHourM(this.hours))}:${this.pad(this.minutes)}:${this.pad(this.seconds)} ${this.determineMeridiem(this.hours)}`;
    }

    //added padding to the time so it always shows twice
    pad(input) {
        let value = input.toString();
        console.log("here");
        console.log(value);
        console.log(value.length);

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
        }, 1000);
    }
}

const newClock = new clock();