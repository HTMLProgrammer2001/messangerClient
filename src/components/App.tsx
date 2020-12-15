import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import store from '../redux';

import MainPage from './MainPage/';
import LogInPage from './LogInPage/';
import SingInPage from './SingInPage/';

import PopUpContext from '../context/PopUpContext';
import PopUpElement from './PopUpElement/';


const App: React.FC<{}> = () => {
	const [renderElement, setElement] = useState<any>(null);

	return (
		<PopUpContext.Provider value={{renderElement, setElement}}>
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route path='/' exact component={MainPage}/>
						<Route path='/login' exact component={LogInPage}/>
						<Route path='/signin' exact component={SingInPage}/>

						<Route path='/' render={() => <Redirect to='/'/>}/>
					</Switch>
				</BrowserRouter>

				<PopUpElement/>
			</Provider>
		</PopUpContext.Provider>
	);
};

export default App;
