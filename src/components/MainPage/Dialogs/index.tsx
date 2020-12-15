import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from './styles.module.scss';
import {RootState} from '../../../redux/';
import {selectDialogs} from '../../../redux/dialogs/selectors';

import Dialog from './Dialog/';
import SearchForm, {ISearchDialogFormData} from './SearchForm';


const mapStateToProps = (state: RootState) => ({
	dialogs: selectDialogs(state)
});

const connected = connect(mapStateToProps, null);

type IDialogsProps = ConnectedProps<typeof connected>;

export const Dialogs: React.FC<IDialogsProps> = ({dialogs}) => (
	<div className={styles.wrapper}>
		<SearchForm onSubmit={
			(vals: ISearchDialogFormData) => console.log(vals)
		}/>

		<div className={styles.dialog_wrap}>
			{
				dialogs.map((dialog) => (
					<Dialog {...dialog} key={dialog.id}/>
				))
			}
		</div>
	</div>
);

export default connected(Dialogs);
