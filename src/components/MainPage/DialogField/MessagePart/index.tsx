import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import UserAvatar from '../../../Common/UserAvatar/';
import MessageInput, {IMessageInputData} from './MessageInput';

import styles from './styles.module.scss';
import {RootState} from '../../../../redux/';
import {selectMe} from '../../../../redux/me/selectors';


const mapStateToProps = (state: RootState) => ({
	user: selectMe(state)
});

const connected = connect(mapStateToProps);

type IMessageForm = ConnectedProps<typeof connected>;

export const MessagePart: React.FC<IMessageForm> = ({user}) => (
	<div className={styles.message_row}>
		<UserAvatar
			avatar={user.avatar}
			name={user.name}
		/>

		<MessageInput onSubmit={console.log}/>
	</div>
);

export default connected(MessagePart);
