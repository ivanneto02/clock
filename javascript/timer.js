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

