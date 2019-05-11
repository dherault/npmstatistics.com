import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import 'flexpad/dist/flexpad.css'

import Layout from './components/Layout'
import RootScene from './scenes/RootScene'
import PackageScene from './scenes/PackageScene'
import NotFoundScene from './scenes/NotFoundScene'

import store from './state/store'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={RootScene} />
          <Route exact path="/package/:packageId" component={PackageScene} />
          <Route component={NotFoundScene} />
        </Switch>
      </Layout>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
