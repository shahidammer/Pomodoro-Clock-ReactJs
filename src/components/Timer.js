import React,{Component} from 'react';
import './Clock.css';
import $ from 'jquery';

export default class Timer extends Component {
    constructor(props){
        super(props);
        console.log();

    }
    formatNumber(num) {
      return (num < 10) ? "0" + num : num;
    }

    secsToTime(length){
        this.animateBackground(length);
        let hrs = Math.floor(length / 3600),
        mins = Math.floor(length % 3600 / 60),
        secs = Math.floor(length % 3600 % 60);
        hrs = (hrs > 0) ? this.formatNumber(hrs) + ":" : "00:";
        mins = (mins > 0) ? this.formatNumber(mins) + ":" : "00:";
        secs = this.formatNumber(secs);
        return hrs === "00:"? mins+""+secs : hrs+""+mins+""+secs;
    }

    animateBackground(val){

        this.props.session === "Session" ?  $('#filler').css('background-color', '#41CA85'): $('#filler').css('background-color', '#f76');

        const totalAreaOfDiv = this.props.totalArea*60;
        let percentFill= 100 - Math.floor(val/totalAreaOfDiv*100);
        $('#filler').css('height', percentFill + '%');


    }
    render(){
        //Interval expects current, title, handler,
        return (
            <div id="timer" onClick={this.props.onToggle}>
                <p>{this.props.session}</p>
                <p>{this.secsToTime(this.props.value)}</p>
                <span id="filler"></span>
            </div>

        );
    }
}
