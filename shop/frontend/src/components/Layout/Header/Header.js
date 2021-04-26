import React, {Component, Fragment} from 'react';
import classes from './Header.module.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromLocalCart, getSmallSearch } from '../../../actions/products';
import { logout } from '../../../actions/auth';
import { onTop, notOnTop } from '../../../actions/layout';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import Spinner from '../Spinner/Spinner';


class Header extends Component {
    state = {
        searchvalue: '',
        showsearch: false,
        style: {
            pointerEvents: 'all'
        },
        navdrawer: false,
        cats: false,
        brands: false,
        cart: false
    }

    componentDidMount() {
        window.onscroll = () => {
            if(window.pageYOffset <= 200) {
                this.props.onTop();
            } else {
                this.props.notOnTop();
            }
          };
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onChange = e => {
        this.setState({
            showsearch: true,
            searchvalue: e.target.value
        });
        if(!e.target.value) {
            this.setState({
                showsearch: false,
                searchvalue: ''
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.searchvalue !== prevState.searchvalue) {
            this.props.getSmallSearch(this.state.searchvalue);
        }
    }

    showModal = () => {
        if(this.state.searchvalue !== '') {
            this.setState({
                showsearch: true
            })
        }
    }

    removeModal = () => {
        this.setState({
            showsearch: false
        })
    }

    linkclick = () => {
        this.setState({
            style: {
                pointerEvents: 'none'
            }
        })
        this.setState({
            style: {
                pointerEvents: 'all'
            }
        })
    }

    toggleDrawer = () => {
        this.setState({
            navdrawer: !this.state.navdrawer
        })
    }

    drawerback = () => {
        this.setState({
            cats: false,
            brands: false,
            cart: false
        })
    }

    drawercats = () => {
       this.setState({
           cats: true
       }) 
    }

    drawerbrands = () => {
        this.setState({
            brands: true
        }) 
     }

     drawercart = () => {
        this.setState({
            cart: true
        }) 
     }

    render() {
        let searcharr = [];
        let arrlen = 100;  // 100 to trigger the spinner
        let sum = 0;
        if(this.props.smallSearch) {
            arrlen = this.props.smallSearch.length;
            searcharr = this.props.smallSearch.map(searchitem => (
                <Link key={searchitem.id} to={`/products/${searchitem.id}`} onClick={this.removeModal} className={classes.searchitem}>
                    <div className={classes.backimg}></div>
                    <div className={classes.img}>
                        <img src={searchitem.picture1}/>
                    </div>
                    <div className={classes.desc}>
                        <div className={classes.text}>
                            <h3>{searchitem.price}$</h3>
                            <h2>{searchitem.name}</h2>
                        </div>
                    </div>
                    <div className={classes.arrow}>
                        <h3>&raquo;</h3>
                    </div>
                </Link>
            ))
        }

        let cartArr = [];
        /*if(this.props.isAuthenticated) {
            if(this.props.dbCart) {
                cartArr = this.props.dbCart.map(item => {
                    sum = sum + parseFloat(item.price);
                    return (
                        <div key={item.id} className={classes.cartcard}>
                            <div className={classes.carttop}>
                                <img src={item.picture1}/>
                            </div>
                            <div className={classes.cartbottom}>
                                <h3>{item.price}$</h3>
                                <div>
                                    <h2>{item.name}</h2>
                                    <button>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        /*} else {*/
            if(this.props.localCart) {
                cartArr = this.props.localCart.map(item => {
                    sum = sum + (parseFloat(item.price) * parseInt(item.amount));
                    return (
                        <div key={item.id} className={classes.cartcard}>
                            <div className={classes.carttop}>
                                <img src={item.picture1}/>
                            </div>
                            <div className={classes.cartbottom}>
                                <h3>{item.price}$</h3>
                                <div>
                                    <h2>{item.name}&nbsp;&#215;&nbsp;{item.amount}</h2>
                                    <button onClick={() => this.props.removeFromLocalCart(item.id)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    )
                })
    
            }
        /*}  */ 
    
        return (
            <Fragment>
            
            {this.state.showsearch ? <div className={classes.searchmodalback} onClick={() => {this.setState({showsearch: false})}}></div> : null}
            
            <div className={this.state.navdrawer ? [classes.navdrawer, classes.navdraweractive].join(' ') : classes.navdrawer}>
                <div onClick={this.toggleDrawer} className={classes.exit}>
                    &#10005;
                </div>
                {!this.state.cats && !this.state.brands && !this.state.cart?
                <div className={classes.navdrawerlinks}>
                {this.props.isAuthenticated ? 
                    <div onClick={this.props.logout} className={classes.navdrawerlink}>Logout</div> 
                    : <Link onClick={this.toggleDrawer} to="/login" className={classes.navdrawerlink}>Login</Link>}
                    <div onClick={this.drawercats} className={classes.navdrawerlink}>Categories</div>
                    <div onClick={this.drawerbrands} className={classes.navdrawerlink}>Brands</div>
                    <div onClick={this.drawercart} className={classes.navdrawerlink}>Carts</div>
                </div>: null }
                {this.state.cats && !this.state.brands ?
                <div className={classes.navdrawerlinks}>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/category/Phones">Phones</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/category/Accessories">Accessories</Link>
                </div> : null}
                {!this.state.cats && this.state.brands && !this.state.cart?
                <div className={classes.navdrawerlinks}>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/apple">Apple</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/google">Google</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/oneplus">OnePlus</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/samsung">Samsung</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/huawei">Huawei</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/oppo">Oppo</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/xiaomi">Xiaomi</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/sony">Sony</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/honor">Honor</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/realme">RealMe</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/nokia">Nokia</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/lg">LG</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/motorola">Motorola</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/lenovo">Lenovo</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/zte">ZTE</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/htc">HTC</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/asus">Asus</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/meizu">Meizu</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/alcatel">Alcatel</Link>
                    <Link onClick={this.toggleDrawer} className={classes.navdrawerlink} to="/brand/vivo">Vivo</Link>
                </div> : null}
                {this.state.cart && !this.state.brands && !this.state.cats ? 
                    <div>
                        <div className={classes.cartcontainer}>
                        {cartArr.length > 0 ? cartArr : 
                            <div className={classes.nocartitems}>
                                <h2>No Added Products</h2>
                            </div>
                        }
                        </div>
                        <div className={classes.calculate}>
                        <div className={classes.total}>
                            <h3>TOTAL</h3>
                            <h3>{sum}$</h3>
                        </div>
                        <Link onClick={this.toggleDrawer} to="/checkout" className={sum > 0 ? classes.checkout : [classes.checkout,classes.checkoutdisable].join(' ')}>CHECKOUT</Link>
                        </div>
                    </div> 
                : null}
                {this.state.cats || this.state.brands || this.state.cart ? <div onClick={this.drawerback} className={classes.drawerback}>&raquo;</div> : null}
            </div>
            <div className={this.props.top ? classes.header : [classes.header, classes.headersmaller].join(" ")}>
                <div onClick={this.toggleDrawer} className={classes.navbutton}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <Link to="/" onClick={this.removeModal} className={classes.logo}>EC<div className={this.props.top ? classes.show : classes.hide}><h3>OMMERCE</h3></div></Link>
                <div className={classes.links}>
                    <div className={classes.headerlinkcontainer}>
                        <div className={classes.headerlink}>Categories</div>
                        <div className={this.props.top ? classes.menushow : [classes.menushow, classes.menushowsmaller].join(" ")} style={this.state.style}>
                            <HeaderMenu title="Categories">
                                <div className={classes.column}>
                                    <Link onClick={this.linkclick} className={classes.menulink} to="/category/Phones">Phones</Link>
                                    <Link onClick={this.linkclick} className={classes.menulink} to="/category/Accessories">Accessories</Link>
                                </div>
                            </HeaderMenu>
                        </div>
                    </div>
                    <div className={classes.headerlinkcontainer}>
                        <div className={classes.headerlink}>Brands</div>
                        <div className={this.props.top ? classes.menushow : [classes.menushow, classes.menushowsmaller].join(" ")} style={this.state.style}>
                            <HeaderMenu title="Brands">
                                    <div className={classes.column}>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/apple">Apple</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/google">Google</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/oneplus">OnePlus</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/samsung">Samsung</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/huawei">Huawei</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/oppo">Oppo</Link>
                                    </div>
                                    <div className={classes.column}>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/xiaomi">Xiaomi</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/sony">Sony</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/honor">Honor</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/realme">RealMe</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/nokia">Nokia</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/lg">LG</Link>
                                    </div>
                                    <div className={classes.column}>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/motorola">Motorola</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/lenovo">Lenovo</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/zte">ZTE</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/htc">HTC</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/asus">Asus</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/meizu">Meizu</Link>
                                    </div>
                                    <div className={classes.column}>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/alcatel">Alcatel</Link>
                                        <Link onClick={this.linkclick} className={classes.menulink} to="/brand/vivo">Vivo</Link>
                                    </div>
                            </HeaderMenu>
                        </div>
                    </div>
                    <div className={classes.headerlinkcontainer}>
                        <div className={classes.headerlink}>Cart</div>
                        <div className={this.props.top ? classes.menushow : [classes.menushow, classes.menushowsmaller].join(" ")}>
                            <HeaderMenu>
                                <div className={classes.cartcontainer}>
                                    {cartArr.length > 0 ? cartArr : 
                                        <div className={classes.nocartitems}>
                                            <h2>No Added Products</h2>
                                        </div>
                                    }
                                </div>
                                <div className={classes.calculate}>
                                    <div className={classes.total}>
                                        <h3>TOTAL</h3>
                                        <h3>{sum}$</h3>
                                    </div>
                                    <Link to="/checkout" className={sum > 0 ? classes.checkout : [classes.checkout,classes.checkoutdisable].join(' ')}>CHECKOUT</Link>
                                </div>
                            </HeaderMenu>
                        </div>
                    </div>
                    <div className={classes.headerlinkcontainer}>
                        {this.props.isAuthenticated ? 
                        <div onClick={this.props.logout} className={classes.headerlink}>Logout</div> 
                        : <Link to="/login" className={classes.headerlink}>Login</Link>}
                    </div>
                </div>
                <form onSubmit={this.onSubmit} className={classes.search}>
                    <input onChange={this.onChange} onClick={this.showModal} value={this.state.searchvalue} placeholder="Search"/>
                    <Link to={`/search/${this.state.searchvalue}`} className={classes.searchbutton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
                    </Link>
                    {this.state.showsearch ? <div className={this.props.top ? classes.searchmodal : [classes.searchmodal,classes.searchmodalsmaller].join(' ')}>
                        {arrlen === 100 ? <div className={classes.noresults}><Spinner/></div> : null}
                        {arrlen > 0 ? searcharr : null}
                        {arrlen === 0 ? <div className={classes.noresults}>No results</div> : null}
                        {arrlen === 6  &&  arrlen !== 100 ? 
                        <Link to={`/search/${this.state.searchvalue}`} className={classes.more}>
                            <h3>MORE &raquo;</h3>
                        </Link> : null }
                    </div> : null}
                </form>
            </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    smallSearch: state.products.currentSearchSmall,
    top: state.layout.top,
    localCart: state.products.localCart,
    dbCart: state.products.dbCart,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getSmallSearch, onTop, notOnTop, removeFromLocalCart, logout })(Header);