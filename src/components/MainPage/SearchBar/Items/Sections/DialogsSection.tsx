import React from 'react';
import {useSelector} from 'react-redux';

import {selectSearchDialogs} from '../../../../../redux/search/slice';
import {IDialog} from '../../../../../interfaces/IDialog';


const DialogsSection: React.FC<{}> = () => {
	const dialogs = useSelector(selectSearchDialogs) as IDialog[];

	if(!dialogs.length)
		return null;

	return (
		<div>
			<b>Dialogs</b>

			{
				dialogs.map(dialog => (
					<div key={dialog._id}>{dialog.name}</div>
				))
			}
		</div>
	);
};

export default DialogsSection;
