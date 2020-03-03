import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Shop from './components/Shop/Shop'
import Product from './components/Product/Product'
import Cart from './components/Cart/Cart'
import Profile from './components/Profile/Profile'

export default (
    <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/product" component={Product}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/profile" component={Profile}/>
    </Switch>
)
