import React, {Component, Fragment} from 'react';
import classes from './HeaderMenu.module.css';

class HeaderMenu extends Component {
    render() {
        return (
            <Fragment>
                <div className={classes.shadowback}></div>
                <div className={classes.headerMenu}>
                    <div className={classes.left}></div>
                    <div className={classes.right}>
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default HeaderMenu;