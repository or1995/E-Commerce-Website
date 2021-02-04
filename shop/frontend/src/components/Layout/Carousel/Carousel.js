import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { getproductsoffers } from '../../../actions/products';
import classes from './Carousel.module.css';
import {Link} from 'react-router-dom';

class Carousel extends Component {
    state = {
        activepage: 1,
        direction: 'f'
    }

    changepage = (page) => {
        clearInterval(this.interval);
        this.setState({activepage: page})
        this.interval = setInterval(() => {
            if(this.state.activepage === 4) {
                return this.setState({ activepage: this.state.activepage - 1, direction: 'b' })
            } else if(this.state.activepage === 1) {
                return this.setState({ activepage: this.state.activepage + 1, direction: 'f'})
            } else if(this.state.direction === 'f'){
                return this.setState({ activepage: this.state.activepage + 1 })
            } else if(this.state.direction === 'b'){
                return this.setState({ activepage: this.state.activepage - 1 })
            }
        }, 5000);
    }

    componentDidMount() {
        this.props.getproductsoffers();
        this.interval = setInterval(() => {
            if(this.state.activepage === 4) {
                return this.setState({ activepage: this.state.activepage - 1, direction: 'b' })
            } else if(this.state.activepage === 1) {
                return this.setState({ activepage: this.state.activepage + 1, direction: 'f'})
            } else if(this.state.direction === 'f'){
                return this.setState({ activepage: this.state.activepage + 1 })
            } else if(this.state.direction === 'b'){
                return this.setState({ activepage: this.state.activepage - 1 })
            }
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let carStyle = {
            left: `-${(this.state.activepage*100) - 100}vw`
        }
        return (
            <div className={classes.carouselouter}>
                <div className={classes.carousel} style={carStyle}>
                {this.props.offers.length > 0 ?
                    <div className={[classes.car1, classes.car].join(" ")}>
                        <div className={classes.carimg}>
                            {this.state.activepage === 1 ? <img className={classes.imgactive} src={this.props.offers[0].picture}/> : <img className={classes.img} src={this.props.offers[0].picture}/>}
                        </div>
                        <div className={classes.cardesc}> 
                            <div className={this.state.activepage === 1 ? classes.caedesccontentactive : classes.caedesccontent}>
                                <h1>{this.props.offers[0].title}</h1>
                                <p>{this.props.offers[0].text}</p>
                                <Link to={`products/${this.props.offers[0].productid}`}>DETAILS</Link>
                            </div>
                        </div>
                    </div> : null }
                    {this.props.offers.length > 0 ? 
                    <div className={[classes.car2, classes.car].join(" ")}>
                        <div className={classes.cardesc2}>
                            <div className={this.state.activepage === 2 ? classes.caedesccontentactive : classes.caedesccontent}>
                                <h1>{this.props.offers[1].title}</h1>
                                <p>{this.props.offers[1].text}</p>
                                <Link to={`products/${this.props.offers[1].productid}`}>DETAILS</Link>
                            </div>
                        </div>
                        <div className={classes.carimg}>
                            {this.state.activepage === 2 ? <img className={classes.imgactive} src={this.props.offers[1].picture}/> : <img className={classes.img} src={this.props.offers[1].picture}/>}
                        </div>
                    </div> : null }
                    {this.props.offers.length > 0 ?
                    <div className={[classes.car3, classes.car].join(" ")}>
                        <div className={classes.carimg}>
                            {this.state.activepage === 3 ? <img className={classes.imgactive} src={this.props.offers[2].picture}/> : <img className={classes.img} src={this.props.offers[2].picture}/>}
                        </div>
                        <div className={classes.cardesc}> 
                            <div className={this.state.activepage === 3 ? classes.caedesccontentactive : classes.caedesccontent}>
                                <h1>{this.props.offers[2].title}</h1>
                                <p>{this.props.offers[2].text}</p>
                                <Link to={`products/${this.props.offers[2].productid}`}>DETAILS</Link>
                            </div>
                        </div>
                    </div> : null }
                    {this.props.offers.length > 0 ?
                    <div className={[classes.car4, classes.car].join(" ")}>
                        <div className={classes.cardesc2}> 
                            <div className={this.state.activepage === 4 ? classes.caedesccontentactive : classes.caedesccontent}>
                                <h1>{this.props.offers[3].title}</h1>
                                <p>{this.props.offers[3].text}</p>
                                <Link to={`products/${this.props.offers[3].productid}`}>DETAILS</Link>
                            </div>
                        </div>
                        <div className={classes.carimg}>
                            {this.state.activepage === 4 ? <img className={classes.imgactive} src={this.props.offers[3].picture}/> : <img className={classes.img} src={this.props.offers[3].picture}/>}
                        </div>
                    </div> : null }
                </div>
                <div className={classes.carouselbuttons}>
                    <div className={classes.carouselbuttonouter} onClick={() => this.changepage(1)}>
                        {this.state.activepage === 1 ? <div className={this.state.direction === 'f' ? classes.carouselbuttoninner : classes.carouselbuttoninnerback}></div> : null}
                    </div>
                    <div className={classes.carouselbuttonouter} onClick={() => this.changepage(2)}>
                        {this.state.activepage === 2 ? <div className={this.state.direction === 'f' ? classes.carouselbuttoninner : classes.carouselbuttoninnerback}></div> : null}
                    </div>
                    <div className={classes.carouselbuttonouter} onClick={() => this.changepage(3)}>
                        {this.state.activepage === 3 ? <div className={this.state.direction === 'f' ? classes.carouselbuttoninner : classes.carouselbuttoninnerback}></div> : null}
                    </div>
                    <div className={classes.carouselbuttonouter}  onClick={() => this.changepage(4)}>
                        {this.state.activepage === 4 ? <div className={this.state.direction === 'f' ? classes.carouselbuttoninner : classes.carouselbuttoninnerback}></div> : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    offers: state.products.offers
})

export default connect(mapStateToProps, { getproductsoffers })(Carousel);