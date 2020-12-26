import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../../redux/';
import styles from './styles.module.scss';
import {selectSearchState} from '../../../redux/search/slice';

import SearchForm from './SearchForm';
import Items from './Items';


const mapStateToProps = (state: RootState) => ({
	search: selectSearchState(state)
});

const connected = connect(mapStateToProps, null);

type ISearchBarProps = ConnectedProps<typeof connected>;
export const Dialogs: React.FC<ISearchBarProps> = ({search}) => (
	<div className={styles.wrapper}>
		<SearchForm/>

		<div className={styles.dialog_wrap}>
			{search.wasError && <div className="red">Some error occured</div>}
			{!search.wasError && search.isLoading && <div>Loading...</div>}
			{!search.wasError && !search.isLoading && <Items/>}
		</div>
	</div>
);

export default connected(Dialogs);
