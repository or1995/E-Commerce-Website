import React, {Component, Fragment} from 'react';
import classes from './Spinner.module.css';


class Spinner extends Component {
    render() {
        return (
            <div className={classes.spinner}>
                <div className={classes.bounce1}></div>
                <div className={classes.bounce2}></div>
                <div className={classes.bounce3}></div>
            </div>
        )
    }
}

export default Spinner;