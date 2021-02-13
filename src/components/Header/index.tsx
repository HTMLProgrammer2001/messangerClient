import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {useHistory, useLocation} from 'react-router';
import {useDispatch} from 'react-redux';

import styles from './styles.module.scss';
import {searchSetCurrent} from '../../redux/search/state/slice';
import Menu from './Menu';
import DataElem from './DataElem';


const Header: React.FC<{}> = () => {
	//data for mobile version
	const [hasBack, setHasBack] = useState(false),
		location = useLocation(),
		history = useHistory(),
		dispatch = useDispatch();

	//handler for back to dialogs
	const bachHandler = () => {
		history.push(location.pathname);
		dispatch(searchSetCurrent(''));
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		setHasBack(!!params.get('dlg'));
	}, [location.search]);

	return (
		<div className={styles.header}>
			<div className={styles.name}>
				{hasBack && <i className={cn(styles.back, 'fas fa-angle-left')} onClick={bachHandler}/>}
				<div className={styles.logo}>Messenger</div>
			</div>

			<DataElem/>
			<Menu/>
		</div>
	);
};

export default Header;
