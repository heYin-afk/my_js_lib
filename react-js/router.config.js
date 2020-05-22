import React from 'react'
import { Route, HashRouter,Switch, Redirect } from 'react-router-dom'
import { Login } from "../component/login/login"
import { Register } from "../component/register/register"
export const Routers = () => {
  return (
    <HashRouter>
      <Switch>
          <Route path="/login" component={Login} exact replace></Route>
          <Route path="/register" component={Register} exact></Route>
          <Redirect to="/login"></Redirect>
      </Switch>
    </HashRouter>
  )
}
