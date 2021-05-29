import {connect, Socket} from 'socket.io-client';

import {DialogStatus} from '../../constants/DialogStatus';


class Websocket{
	private socket: typeof Socket;

	connect(connectHandler?: () => void){
		this.socket = connect(process.env.REACT_APP_WS_URL || 'http://localhost:5000', {
			reconnectionAttempts: Infinity,
			query: {Token: localStorage.getItem('token')}
		});

		this.socket.on('connect', connectHandler);
	}

	addHandler(event: string, fn: (...args: any[]) => void): () => void{
		this.socket?.on(event, fn);
		return () => this.socket?.off(event, fn);
	}

	changeDialogStatus(dialogID: string, statusType: DialogStatus){
		this.socket?.emit('changeDialogStatus', {dialog: dialogID, status: statusType});
	}

	viewMessages(ids: string[]){
		this.socket?.emit('viewMessages', ids);
	}

	sendCall(to: string){
		this.socket?.emit('sendCall', to);
	}

	disconnectCall(to: string){
		this.socket?.emit('disconnectCall', to);
	}

	acceptCall(peerID: string, withUser: string){
		this.socket?.emit('acceptCall', peerID, withUser);
	}

	removeHandler(event: string, fn: (...args: any[]) => void){
		this.socket?.off(event, fn);
	}

	disconnect(){
		if(this.socket?.connected)
			this.socket.disconnect();
	}
}

export default new Websocket();
