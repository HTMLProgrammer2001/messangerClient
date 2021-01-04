import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useHistory, useLocation} from 'react-router';

import Loader from '../../components/Common/PageLoader';
import {selectMeInfo} from '../../redux/me/slice';
import {selectAppState, appStart} from '../../redux/app/slice';
import {searchSetCurrent} from '../../redux/search/state/slice';


const IsAuthenticated = (isAuth: boolean = true) =>
	<T extends object>(Elem: React.ComponentType<T>) => {
		let from: string = '';

		const AuthenticatedElement: React.FC<T> = (props) => {
			//get data from store
			const app = useSelector(selectAppState),
				user = useSelector(selectMeInfo);

			const dispatch = useDispatch(),
				location = useLocation(),
				history = useHistory();

			useEffect(() => {
				//start initializing
				if(!app.initialized)
					dispatch(appStart());
			}, []);

			useEffect(() => {
				if(location.search){
					const params = new URLSearchParams(location.search.slice(1));
					dispatch(searchSetCurrent(params.get('dlg')));
				}
			}, []);

			if(app.isLoading || !app.initialized)
				return <Loader/>;

			if (!user && isAuth) {
				if(!from)
					from = `${location.pathname}${location.search}${location.hash}`;

				return <Redirect to='/login'/>;
			}

			if(user && !isAuth)
				return <Redirect to='/'/>;

			if(from){
				history.push(from);
				from = null;
			}

			return <Elem {...(props)}/>;
		};

		return AuthenticatedElement;
	};

export default IsAuthenticated;
