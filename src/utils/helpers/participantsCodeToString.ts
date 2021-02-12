import {ParticipantsTypes} from '../../constants/ParticipantTypes';


const participantsCodeToString = (types: ParticipantsTypes) => {
	switch (types) {
		case ParticipantsTypes.USER:
			return 'User';

		case ParticipantsTypes.ADMIN:
			return 'Admin';

		case ParticipantsTypes.OWNER:
			return 'Owner';

		default:
			return 'Unknown';
	}
};

export default participantsCodeToString;
