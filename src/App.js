import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Cart from './components/Cart'
import Home from './components/Home'
import Shelf from './components/Shelf'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shelf">Shelf</Link></li>
                  <li><Link to="/cart">Cart</Link> ({Object.keys(this.props.cart).length || 0})</li>
                </ul>
              </nav>
            </header>
            <div className="content">
              <Route exact path="/" component={
                () => (<Home name="Brandi" />)
              } />
              <Route path="/shelf" component={Shelf} />
              <Route path="/cart" component={Cart} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state, props){
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(App)

