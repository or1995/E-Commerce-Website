import React, {Component, Fragment} from 'react';
import classes from './Footer.module.css';

class Footer extends Component {
    render() {
        return (
            <div className={classes.footer}>
                <div className={classes.left}>
                    ECOMMERCE
                </div>
                <div className={classes.right}>
                    This website was created by Omar Ali OWD in 2020&copy;, this website was created for demonstration purposes.
                </div>
            </div>
        )
    }
}

export default Footer;