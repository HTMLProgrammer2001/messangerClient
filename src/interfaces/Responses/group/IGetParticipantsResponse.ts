import {IParticipant} from '../../IParticipants';
import {ParticipantsTypes} from '../../../constants/ParticipantTypes';


export type IGetParticipantsResponse = {
	message: ParticipantsTypes,
	participants: IParticipant[]
}
