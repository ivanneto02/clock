class clock {

    constructor() {
        this.currdate = new Date();
        document.getElementById("time").innerHTML = "Current date: <br>Current Time: ";
        this.iterate();
    }

    formatTime() {
        this.currtime = new Date();

        this.hours = this.currtime.getHours();
        this.minutes = this.currtime.getMinutes();
        this.seconds = this.currtime.getSeconds();

        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }

    formatDate() {
        this.currdate = new Date();

        this.year = this.currdate.getFullYear();
        this.month = this.currdate.getMonth();
        this.day = this.currdate.getDay();

        return `${this.year}-${this.month}-${this.day}`;
    }

    iterate() {
        document.getElementById("time").innerHTML = "Current date: " + this.formatDate() + "<br>" + "Current time: " + this.formatTime();
        
        setTimeout(() => {
            this.iterate();
        }, 1000);
        

    }
}

const newClock = new clock();