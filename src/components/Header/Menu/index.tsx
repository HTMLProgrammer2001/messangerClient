import React, {useState, useEffect} from 'react';
import classnames from 'classnames';

import styles from '../styles.module.scss';
import MenuList from '../MenuList';


const Menu: React.FC<{}> = () => {
	const [isOpen, changeOpen] = useState(false);

	useEffect(() => {
		//handler that hide menu when user click on window
		const handler = (e: MouseEvent) => {
			const elem: HTMLElement = e.target as HTMLElement;

			if(!elem.closest(`.${styles.menu}`))
				changeOpen(false);
		};

		//set handler
		document.body.addEventListener('click', handler);

		//return fn that will be called when element destroy
		return () => {
			document.body.removeEventListener('click', handler);
		}
	}, []);

	return (
		<div className={styles.menu}>
			<i 
				className={classnames('fas fa-ellipsis-v', styles.menu_icon)} 
				onClick={() => changeOpen(!isOpen)}
			/>

			<MenuList isOpen={isOpen}/>
		</div>
	);
};

export default Menu;
