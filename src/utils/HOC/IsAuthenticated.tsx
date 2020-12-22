import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router';

import Loader from '../../components/Common/Loader';
import {selectMeInfo} from '../../redux/me/slice';
import {selectAppState, appStart} from '../../redux/app/slice';


const IsAuthenticated = (isAuth: boolean = true) =>
	<T extends object>(Elem: React.ComponentType<T>) => {
		const AuthenticatedElement: React.FC<T> = (props) => {
			//get data from store
			const app = useSelector(selectAppState),
				user = useSelector(selectMeInfo);

			const dispatch = useDispatch();

			useEffect(() => {
				//start initializing
				if(!app.initialized)
					dispatch(appStart());
			}, []);

			if(app.isLoading || !app.initialized)
				return <Loader/>;

			if (!user && isAuth)
				return <Redirect to='/login'/>;

			if(user && !isAuth)
				return <Redirect to='/'/>;

			return <Elem {...(props)}/>;
		};

		return AuthenticatedElement;
	};

export default IsAuthenticated;
