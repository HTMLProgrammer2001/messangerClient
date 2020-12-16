import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router';

import {selectAppState} from '../../redux/app/selectors';
import {selectMe} from '../../redux/me/selectors';
import {appInitializeStart} from '../../redux/app/actions';


const IsAuthenticated = (isAuth: boolean = true) =>
	<T extends object>(Elem: React.ComponentType<T>) => {
		const AuthenticatedElement: React.FC<T> = (props) => {
			//get data from store
			const app = useSelector(selectAppState),
				user = useSelector(selectMe);

			const dispatch = useDispatch();

			useEffect(() => {
				//start initializing
				if(!app.initialized)
					dispatch(appInitializeStart());
			}, []);

			if(app.isLoading || !app.initialized)
				return <div>Loading...</div>;

			if (!user && isAuth)
				return <Redirect to='/login'/>;

			if(user && !isAuth)
				return <Redirect to='/'/>;

			return <Elem {...(props)}/>;
		};

		return AuthenticatedElement;
	};

export default IsAuthenticated;
