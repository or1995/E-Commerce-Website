import React, {Component, Fragment} from 'react';
import classes from './ProductSpecs.module.css';
import {withRouter, Link} from 'react-router-dom';
import notepic from '../../../../media/Galaxy-Note-20-Ultra.png';
import Spinner from '../../../Layout/Spinner/Spinner';


class ProductSpecs extends Component {
    render() {
        return (
            <div className={classes.ProductSpecs}>
                <h2 className={classes.maintitle}>Specifications</h2>
                {this.props.specs ? 
                <div className={classes.specstable}>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>Processor</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.processor}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>Ram</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.ram}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>Camera</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.camera}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>Display</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.display}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>Battery</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.battery}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>storage</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.storage}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>Materials</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.material}</h3>
                         </div>
                     </div>
                     <div className={classes.specsrow}>
                         <div className={classes.title}>
                            <h3>OS</h3>
                         </div>
                         <div className={classes.spec}>
                            <h3>{this.props.specs.os}</h3>
                         </div>
                     </div>
                </div> : <div className={classes.spinnerdiv}><Spinner/></div>}
            </div>
        )
    }
}

export default ProductSpecs;