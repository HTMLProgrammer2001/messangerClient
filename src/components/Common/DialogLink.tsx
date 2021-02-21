import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {searchSetCurrent} from '../../redux/search/state/slice';


type IDialogLinkProps = {
	text: string,
	nick: string
}

const DialogLink: React.FC<IDialogLinkProps> = ({text, nick}) => {
	const dispatch = useDispatch(),
		handler = () => dispatch(searchSetCurrent(nick));

	return <Link to={`/?dlg=${nick}`} onClick={handler}>{text}</Link>;
};

export default DialogLink;
