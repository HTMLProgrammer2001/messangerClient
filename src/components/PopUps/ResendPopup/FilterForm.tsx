import React, {useState} from 'react';
import styles from '../../pages/MainPage/SearchBar/styles.module.scss';


type IFilterFormProps = {
	onFilter: (val: string) => void
}

const FilterForm: React.FC<IFilterFormProps> = ({onFilter}) => {
	const [filter, setFilter] = useState('');

	return (
		<form onSubmit={(e) => {onFilter(filter); e.preventDefault();}} className={styles.form} autoComplete="off">
			<input
				name="filter"
				type="text"
				className="input_filled"
				placeholder="Search dialog by name or nick start from @"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</form>
	);
};

export default FilterForm;
