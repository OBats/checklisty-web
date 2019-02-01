import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import ShowCheckList from './components/main/ShowCheckList'
import { Redirect } from 'react-router';

const Routes = () => (

	<BrowserRouter>
		<Switch>
			<Route path="/auth/signin/" component={SignIn} />
			<Route path="/auth/signup/" component={SignUp} />
			<Route exact path='/home' component={MainPage}></Route>
            <Route exact path='/home/:id' component={ShowCheckList}></Route>
            <Redirect to='/home'></Redirect>
		</Switch>
	</BrowserRouter>
)

export default Routes;
