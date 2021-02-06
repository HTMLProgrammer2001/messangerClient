import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import UserAvatar from '../UserAvatar';


export type ISearchItemData = {
	id: string,
	name: string,
	avatar?: string,
	isOnline?: boolean,
}

type ISearchItemProps = {
	item: ISearchItemData,
	active: boolean,
	toggle: (id: string) => void
};

const SearchItem: React.FC<ISearchItemProps> = ({item, toggle, active}) => (
	<div
		className={cn(styles.user, {[styles.active]: active})}
		onClick={() => toggle(item.id)}
	>
		<UserAvatar name={item.name} avatar={item.avatar} size={40}/>
		<div className={styles.user_name}>{item.name}</div>
	</div>
);

export default SearchItem;
