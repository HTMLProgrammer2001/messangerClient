import {takeEvery, put, select} from 'redux-saga/effects';

import {IGroupNameFormData} from '../../components/PopUps/NewGroupNamePopup/NameForm';


function* newGroup(){

	try{
		//make api request
		//yield call(authAPI.logIn, formValuesT);
	}
	catch(e){
		//update error

	}
}

function* watchNewGroupSaga(){
	//watch
	// yield takeEvery(GROUP_CREATE, newGroup);
}

export default watchNewGroupSaga;
