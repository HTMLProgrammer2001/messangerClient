import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styles from './styles.module.scss';
import {RootState} from '../../../redux/';
import {selectCurrentDialog, selectDialogs} from '../../../redux/dialogs/selectors';

import Dialog from './Dialog/';
import SearchForm, {ISearchDialogFormData} from './SearchForm';
import {dialogsChangeCurrent} from '../../../redux/dialogs/actions';


const mapStateToProps = (state: RootState) => ({
	dialogs: selectDialogs(state),
	current: selectCurrentDialog(state)
});

const connected = connect(mapStateToProps, {changeCurrent: dialogsChangeCurrent});

type IDialogsProps = ConnectedProps<typeof connected>;
export const Dialogs: React.FC<IDialogsProps> = ({dialogs, current, changeCurrent}) => (
	<div className={styles.wrapper}>
		<SearchForm/>

		<div className={styles.dialog_wrap}>
			{
				dialogs.map((dialog) => (
					<Dialog
						key={dialog.id}
						dialog={dialog}
						current={current}
						changeCurrent={changeCurrent}
					/>
				))
			}
		</div>
	</div>
);

export default connected(Dialogs);
