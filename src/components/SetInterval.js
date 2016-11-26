import React,{Component} from 'react';
import './Clock.css';

export default class SetInterval extends Component {
    constructor(props){
        super(props);
        console.log();
    }

    render(){
        //Interval expects current, title, handler,
        return (
            <div id={this.props.title +"Style"}>
                <label>{this.props.title }</label><br/>
                    <Button id={this.props.title} onClick={this.props.onClick} operator="-" />
                    <label id="valueLabel">{this.props.value}</label>
                    <Button id={this.props.title} onClick={this.props.onClick} operator="+"/>
            </div>
        );
    }
}
const Button=function(props){
    //Button expects name, operator and handler.
    return (
        <button className={props.id +"Btn"} id={props.id} onClick={props.onClick} >
            {props.operator}
         </button>
        );
};
