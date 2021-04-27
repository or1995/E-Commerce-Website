import React, {Component, Fragment} from 'react';
import classes from './Scroll.module.css';


class Scroll extends Component {
    render() {
        return (
            <div className={classes.scroll}>
                <div className={classes.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Scroll;