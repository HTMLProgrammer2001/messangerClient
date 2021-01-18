import React from 'react';

import styles from '../../styles.module.scss';
import UserAvatar from '../../../../Common/UserAvatar';


type ISearchItemProps = {
	dlgProps: {
		nick?: string,
		name: string,
		unread?: number,
		text?: string,
		avatar?: string,
		time?: string
	},
	isCurrent: boolean,
	handler: () => void
};

export const SearchItem: React.FC<ISearchItemProps> = ({handler, isCurrent, dlgProps}) => (
	<div
		className={`${styles.dialog} ${isCurrent ? styles.active : ''}`}
		onClick={handler}>

		<UserAvatar name={dlgProps.name} avatar={dlgProps.avatar} size={50}/>

		<div className={styles.dialog_content}>
			<div className={styles.dialog_header}>
				<div className={styles.dialog_name}>
					{dlgProps.name}

					<p className={styles.dialog_last}>
						<div className={styles.dialog_overflow}>
							{dlgProps.text}
						</div>
					</p>
				</div>

				<div className={styles.dialog_time}>
					{dlgProps.time}

					{
						!!dlgProps.unread &&
						<div className={styles.dialog_unreaded}>
							{dlgProps.unread}
						</div>
					}
				</div>
			</div>
		</div>
	</div>
);

export default SearchItem;
