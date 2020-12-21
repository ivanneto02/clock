class stopwatch {
    constructor() {
        this.text = "Changed!";
        this.isRunning = false;
        this.startTime;
        this.endTime;
        this.duration = 0;
        this.display_duration = 0.0;
        this.times = {};
        this.count = 0;
    }

    iterate() {
        this.sleep(100);
        if(this.isRunning) {
            
            this.iterateTime = new Date();
            this.display_seconds =  (this.iterateTime.getTime() - this.startTime.getTime()) / 1000;
            this.display_duration = this.display_duration + this.display_seconds + parseFloat(this.duration);
            this.display_duration = this.display_duration.toFixed(2);
            document.getElementById("stopwatch").innerHTML="Stopwatch:<br>" + this.formatTime(this.display_duration);
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
        this.duration = parseFloat(this.duration) + parseFloat(this.seconds);
        this.duration = this.duration.toFixed(2);
        document.getElementById("stopwatch").innerHTML="Stopwatch:<br>" + this.formatTime(this.duration.toString());

        
    }

    reset() {
        this.duration = 0;
        this.startTime, this.endTime = null, null;
        this.isRunning = false;
        this.times = {};
        document.getElementById("stopwatch").innerHTML="Stopwatch:<br>" + "00:00";
        document.getElementById("alerttext").innerHTML = "";
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

      formatTime(input) {
        let str = input.toString().replace(".", ":");
        let ret = "";
        let arr = str.split(":");
        var i;
        var mins = 0;
        if(arr.length>=2 && arr.length < 5) {
            let temp = arr[0];
            if(parseInt(arr[0])>=60) {
                mins = Math.floor(parseInt(arr[0]) / 60);
                arr[0]=(parseInt(arr[0])-(mins*60)).toString();
            }
        }

        for(i=0; i<arr.length; i++) {
            arr[i]=this.pad(arr[i]);
            ret+=arr[i]+":"
        }
        if(mins>0) {
            ret = this.pad(mins.toString()) + ":" + ret;
        }

        //console.log(ret);
        return ret.substr(0, ret.length-1);       
    }

    pad(input) {
        let value = input.toString();

        if(value.length < 2 && value.length !=0) {
            return "0" + value;
        }
        return value;
    }

    recordTime() {
        document.getElementById("Stopwatch")
        let temp = this.count;
        Object.assign(this.times, {[temp]:document.getElementById("stopwatch").innerHTML.split("<br>")[1]});
        //console.log(this.times);
        document.getElementById("alerttext").innerHTML = "Recorded Time " + document.getElementById("stopwatch").innerHTML.split("<br>")[1];
        this.count +=1;
    }

    exportTimes() {
        var json = JSON.stringify(this.times);
        console.log(json);
        json = [json];
        var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob1, "times.json");
        } else {
            var url = window.URL || window.webkitURL;
            var link = url.createObjectURL(blob1);
            var a = document.createElement("a");
            a.download = "times.json";
            a.href = link;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}

const newStopwatch = new stopwatch();