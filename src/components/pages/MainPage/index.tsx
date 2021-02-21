import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import cn from 'classnames';
import {useDispatch} from 'react-redux';

import styles from './styles.module.scss';
import {wsConnect, wsDisconnect} from '../../../redux/ws/wsAPI';

import SearchBar from './SearchBar';
import DialogField from './DialogField';
import Header from '../../Header';
import IsAuthenticated from '../../../utils/HOC/IsAuthenticated';


const MainPage: React.FC<{}> = () => {
	const [isDialogMode, setDialogMode] = useState(false),
		location = useLocation(),
		dispatch = useDispatch();

	useEffect(() => {
		//parse QP
		const params = new URLSearchParams(location.search);
		setDialogMode(!!params.get('dlg'));
	}, [location.search]);

	useEffect(() => {
		document.title = 'Messenger';

		//connect to websocket
		dispatch(wsConnect());
		return () => {dispatch(wsDisconnect())};
	}, []);

	return (
		<div className={cn("container", styles.cont)}>
			<Header/>

			<div className={styles.wrapper}>
				<SearchBar isSelect={!isDialogMode}/>
				<DialogField isSelect={isDialogMode}/>
			</div>
		</div>
	);
};

export default IsAuthenticated(true)(MainPage);
