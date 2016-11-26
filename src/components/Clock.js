import React,{Component} from 'react';

import './Clock.css';
import SetInterval from './SetInterval.js'
import Timer from './Timer.js'

let sessionLength=0;
let breakLength=0;

export default class Clock extends Component {
    constructor(props){
        super(props);
        this.state={
            session:0,
            break:0,
            isActive:false,
            current:"Session"
        };
        sessionLength=props.defaultSession;
        breakLength=props.defaultBreak;
        this.onClickHandler= this.onClickHandler.bind(this);
        this.toggleTimer=this.toggleTimer.bind(this);

    }
    componentWillMount(){
        this.setState({
            session:sessionLength*60,
            break: breakLength*60
        });

    }
    toggleTimer(){
        this.setState({
            isActive:!this.state.isActive
        },function(){
            if(this.state.isActive)
                this.timerID = setInterval(() => this.tick(),200);
            else{
                clearInterval(this.timerID);
            }
        });

    }
    tick(){

        if(this.state.current === "Session"){
            this.setState({session:this.state.session -1});
            if(this.state.session===0){
                clearInterval(this.timerID);

                this.setState({
                    session:sessionLength*60,
                    current:"Break",
                    isActive:false
                },this.toggleTimer);
            }

        }
        else if(this.state.current === "Break"){
            this.setState({break:this.state.break -1});
            if(this.state.break===0){
                clearInterval(this.timerID);


                this.setState({
                    break:breakLength*60,
                    current:"Session",
                    isActive:false
                },this.toggleTimer);
            }
        }
    }
    setIntervalLength(curr,val){
        if(val <1)
            curr === "session"?sessionLength=1:breakLength=1;
        else
            curr === "session"?this.setState({session:val*60}):this.setState({break:val*60});
    }
    onClickHandler(e){
        if(this.state.isActive ===false){
            if(e.target.id === "Session"){
                    e.target.textContent ==="+"? sessionLength++ :sessionLength--;
                    this.setIntervalLength("session",sessionLength);
            }
            else if(e.target.id === "Break"){
                e.target.textContent ==="+"? breakLength++ :breakLength--;
                    this.setIntervalLength("break",breakLength);
            }
        }
    }
    render(){
        const timerValue =this.state.current === "Session"? this.state.session: this.state.break;
        return (
            <div id="Clock">
                <Header />
                 <SetInterval title="Session" onClick={this.onClickHandler} value={sessionLength}  />
                <SetInterval title="Break" onClick={this.onClickHandler} value={breakLength}  />

                <Timer session={this.state.current} value={timerValue} onToggle={this.toggleTimer}
                     totalArea={this.state.current === "Session"? sessionLength:breakLength}/>
            </div>
        );
    }
};
const Header=function(){
    return (
        <div id="ClockTitle">
            <h1>Pomodmoro Clock</h1>
        </div>
    );
};


Clock.defaultProps = {
  defaultSession:5,
  defaultBreak:2
};
