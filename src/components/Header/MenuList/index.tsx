import React from 'react';
import classnames from 'classnames';

import styles from '../styles.module.scss';
import NewGroupPopup from '../../NewGroupPopup';
import SettingsPopup from '../../SettingsPopup';
import AboutPopup from '../../AboutPopup';
import PopUpContext from '../../../utils/context/PopUpContext';


type IMenuListProps = {
	isOpen: boolean
}

const MenuList: React.FC<IMenuListProps> = ({isOpen}) => (
	<PopUpContext.Consumer>
		{
			({setElement}) => (
				<ul className={
					classnames(styles.menu_list, {
						[styles.show]: isOpen
					})
				}>
					<li
						className={styles.menu_link}
						onClick={() => setElement(() => <NewGroupPopup/>)}
					>
						<i className="fas fa-users"/>
						New group
					</li>

					<li
						className={styles.menu_link}
						onClick={() => setElement(() => <SettingsPopup/>)}
					>
						<i className="fas fa-cog"/>
						Settings
					</li>

					<li
						className={styles.menu_link}
						onClick={() => setElement(() => <AboutPopup/>)}
					>
						<i className="fas fa-info-circle"/>
						About
					</li>
				</ul>
			)
		}
	</PopUpContext.Consumer>
);

export default MenuList;
