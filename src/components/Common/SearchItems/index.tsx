import React from 'react';

import styles from './styles.module.scss';
import SearchItem, {ISearchItemData} from './SearchItem';


type ISearchItemsProps = {
	items: Array<ISearchItemData>,
	selected: string[],
	toggle: (id: string) => void
}

const SearchItems: React.FC<ISearchItemsProps> = ({items, selected, toggle}) => (
	<div className={styles.list}>
		{
			items.map((item) => (
				<SearchItem
					key={item.id}
					active={!!~selected.indexOf(item.id)}
					toggle={toggle}
					item={item}
				/>
			))
		}

		{!items.length && <div>Nothing was found</div>}
	</div>
);

export default SearchItems;
