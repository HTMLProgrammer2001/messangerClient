import React, {lazy, Suspense, useState} from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import store from '../redux';

import PopUpContext from '../utils/context/PopUpContext';
import PopUpElement from './PopUps/PopUpElement/';
import PageLoader from './Common/PageLoader';

const MainPage = lazy(() => import('./pages/MainPage/'));
const LogInPage = lazy(() => import('./pages/LogInPage/'));
const SingInPage = lazy(() => import('./pages/SingInPage/'));
const ChangePage = lazy(() => import('./pages/ChangePhonePage/'));


const App: React.FC<{}> = () => {
	const [renderElements, setElement] = useState<any[]>([]);

	const addElement = (elem: any) => {
		if(!elem) console.log(renderElements);
		setElement(elem ? [...renderElements, elem] : renderElements.slice(0, renderElements.length - 1));
	};

	return (
		<PopUpContext.Provider value={{renderElements, setElement: addElement}}>
			<Provider store={store}>
				<Suspense fallback={<PageLoader/>}>
					<HashRouter>
						<Switch>
							<Route path='/' exact component={MainPage}/>
							<Route path='/login' exact component={LogInPage}/>
							<Route path='/sign' exact component={SingInPage}/>
							<Route path='/change' exact component={ChangePage}/>

							<Route path='/' render={() => <Redirect to='/'/>}/>
						</Switch>

						<PopUpElement/>
					</HashRouter>
				</Suspense>

				<ToastContainer/>
			</Provider>
		</PopUpContext.Provider>
	);
};

export default App;
