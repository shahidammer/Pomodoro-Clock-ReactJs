import React, { Component } from 'react';
import './PodomoroClock.css';
import $ from 'jquery';

let podomoroObj={
    sessionLabelValue:0,
    breakLabelValue:0,
    current:"Session",
    clockTotalArea :1,
    FillColorArea:1
};
export default class PodomoroClock extends Component {
    constructor(props){
        super(props);
        this.state={
            session:props.sessionLength,
            break:props.breakLength,
        };
        this.increamentBreakTime=this.increamentBreakTime.bind(this);
        this.decreamentBreakTime=this.decreamentBreakTime.bind(this);
        this.increamentSessionLength=this.increamentSessionLength.bind(this);
        this.decreamentSessionLength=this.decreamentSessionLength.bind(this);
        this.toggleTimer=this.toggleTimer.bind(this);
    }
    componentWillMount(){
        podomoroObj.sessionLabelValue=this.state.session;
        podomoroObj.breakLabelValue=this.state.break;
        this.reset();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    toggleTimer(){
        podomoroObj.startTimer=!podomoroObj.startTimer;
        if(podomoroObj.startTimer)
            this.timerID = setInterval(() => this.tick(),1000);
        else{
            clearInterval(this.timerID);
        }

    }
    reset(){
        if(podomoroObj.current === "Session"){
            this.setState({session:this.state.session *60});
            $('#filler').css('background-color',"#41CA85");
            podomoroObj.clockTotalArea=podomoroObj.sessionLabelValue *60;

        }
        else if(podomoroObj.current === "Break"){
            this.setState({break:this.state.break *60});
            $('#filler').css('background-color',"#EB3333");
            podomoroObj.clockTotalArea=podomoroObj.breakLabelValue *60;

        }

        $('#filler').css('height',"0");
    }
    tick(){
        let percentFill= 100 - Math.floor(podomoroObj.FillColorArea/podomoroObj.clockTotalArea *100);
        $('#filler').css('height', percentFill + '%');

        if(podomoroObj.current === "Session"){
            this.setState({session:this.state.session -1});
            podomoroObj.FillColorArea=this.state.session;
            if(this.state.session<0)
                this.checkForCurrentSession();

        }
        else if(podomoroObj.current === "Break"){
            this.setState({break:this.state.break -1});
            podomoroObj.FillColorArea=this.state.break;

            if(this.state.break<0)
                this.checkForCurrentSession();
        }
    }
    checkForCurrentSession(){
        this.toggleTimer();
        if(podomoroObj.current === "Session"){
            podomoroObj.current = "Break";

            this.setState({
                session:podomoroObj.sessionLabelValue
            });
        }
        else{
            podomoroObj.current = "Session";
            this.setState({
                break:podomoroObj.breakLabelValue
            });

        }
        this.reset();
        this.toggleTimer();
    }

//ss

    increamentBreakTime(){
        if(!podomoroObj.startTimer){
            podomoroObj.breakLabelValue++;
            let multiplier=1;
            if(podomoroObj.current==="Break"){
                podomoroObj.clockTotalArea=podomoroObj.breakLabelValue *60;
                multiplier=60;
            }

            this.setState({
                break:podomoroObj.breakLabelValue*multiplier
            });


        }

    }
    decreamentBreakTime(){
        if(!podomoroObj.startTimer && this.state.break >1){
            podomoroObj.breakLabelValue--;
            let multiplier=1;
            if(podomoroObj.current==="Break"){
                podomoroObj.clockTotalArea=podomoroObj.breakLabelValue *60;
                multiplier=60;
            }
            this.setState({
                break:podomoroObj.breakLabelValue*multiplier
            });

        }
    }
    increamentSessionLength(){
        if(!podomoroObj.startTimer){
            podomoroObj.sessionLabelValue++;
            let multiplier=1;
            if(podomoroObj.current==="Session"){
                podomoroObj.clockTotalArea=podomoroObj.sessionLabelValue *60;
                multiplier=60;
            }

            this.setState({
                session:podomoroObj.sessionLabelValue*multiplier
            });



        }
    }
    decreamentSessionLength(){
        if(!podomoroObj.startTimer && this.state.session >1){
            podomoroObj.sessionLabelValue--;
            let multiplier=1;
            if(podomoroObj.current==="Session"){
                podomoroObj.clockTotalArea=podomoroObj.sessionLabelValue *60;
                multiplier=60;
            }

            this.setState({
                session:podomoroObj.sessionLabelValue*multiplier
            });


        }
    }
    formatNumber(num) {
      return (num < 10) ? "0" + num : num;
    }

    secsToTime(length){
        var hrs = Math.floor(length / 3600);
        var mins = Math.floor(length % 3600 / 60);
        var secs = Math.floor(length % 3600 % 60);
        hrs = (hrs > 0) ? this.formatNumber(hrs) + ":" : "00:";
        mins = (mins > 0) ? this.formatNumber(mins) + ":" : "00:";
        secs = this.formatNumber(secs);
        return hrs === "00:"? mins+""+secs : hrs+""+mins+""+secs;
    }

  render() {
    return (
      <div className="PodomoroClock">
          <Header />
          <Interval
              id={this.props.SessionId} text="Session Length" value={podomoroObj.sessionLabelValue}
              onClick={[this.decreamentSessionLength,this.increamentSessionLength]}
          />
          <Interval
               id={this.props.ButtonId} text="Break Length" value={podomoroObj.breakLabelValue}
               onClick={[this.decreamentBreakTime,this.increamentBreakTime]}
           />
          <Timer param={podomoroObj.current === "Session" ? this.secsToTime(this.state.session):this.secsToTime(this.state.break)} onToggle={ this.toggleTimer} />

      </div>
    );
  }
}

const Header=function(){
    return (
        <div id="ClockHeader">
            <h1>Pomodmoro Clock</h1>
        </div>
    );
};

const Interval=function(props){

    return (
            <div id={props.id}>
                <label>{props.text}</label><br/>
                <button onClick={props.onClick[0]}> - </button>
                <label id="valueLabel">{props.value}</label>
                <button onClick={props.onClick[1]}> + </button>
            </div>


        );
};

const Timer = (props)=>{

        return (
            <div id="timer" onClick={props.onToggle}>
                <p>{podomoroObj.current}</p>
                <p>{props.param}</p>
                <span id="filler"></span>

            </div>
        );
};


PodomoroClock.defaultProps = {
  ButtonId: 'breakBtn',
  SessionId: 'sessionBtn',
  sessionLength:5,
  breakLength:2
};
