import React, {Component, Fragment} from 'react';
import classes from './Scroll.module.css';
import {Link} from 'react-router-dom';


class Scroll extends Component {
    state = {
        position: 0
    }

    rightclick = () => {
        console.log('hi');
        if(this.state.position > -32) {
            this.setState({
                position: this.state.position - 16
            })
        }
    }

    leftclick = () => {
        console.log('hello');
        if(this.state.position < 0 ) {
            this.setState({
                position: this.state.position + 16
            })
        }
    }

    render() {
        let style = {
            transform: `translateX(${this.state.position}%)`
        }

        return (
            <div className={classes.scroll}>
                <div className={classes.content} style={style}>
                    {this.props.children}
                </div>
                <div className={classes.leftbutton}>
                    <div onClick={this.leftclick}>
                        &#8249;
                    </div>
                </div>
                <div className={classes.rightbutton}>
                    <div onClick={this.rightclick}>
                        &#8250;
                    </div>
                </div>
            </div>
        )
    }
}

export default Scroll;