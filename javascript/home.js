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
    }

    iterate() {
        // Function to iterate
        this.iterThis = () => {
            document.getElementById("time").innerHTML = "Current date: " + this.formatDate() + "<br>" + "Current time: " + this.formatTime();
        }

        this.iterThis();
        // Call iterThis every second
        setInterval(this.iterThis, 1000);
    }

        /*
        this.hours = this.currtime.getHours();
        this.minutes = this.currtime.getMinutes();
        this.seconds = this.currtime.getSeconds();

        if(this.millatary_time) {
            return `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
        }
        
        return `${this.pad(this.formatHourM(this.hours))}:${this.pad(this.minutes)}:${this.pad(this.seconds)} ${this.determineMeridiem(this.hours)}`;
        */

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

}
const Clock = new digitalClock();