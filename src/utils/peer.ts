import Peer from 'peerjs';


class PeerService{
	private peer: Peer = null;
	private stream: MediaStream = null;
	private peerID: string = null;

	async open(userID: string){
		this.peer = new Peer(userID, {
			host: process.env.WEBRTC_HOST || 'localhost',
			port: +process.env.WEBRTC_PORT || 9000
		});

		this.peerID = userID;
	}

	getID(): string{
		console.log(this.peerID);
		return this.peerID;
	}

	async getStream(){
		if(!this.stream) {
			this.stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			});
		}

		return this.stream;
	}

	addHandler(event: string, callBack: any){
		this.peer?.on(event, callBack);
	}

	removeHandler(event: string, callback: any){
		this.peer?.off('event', callback);
	}

	disconnect(){
		this.peer?.disconnect();
		this.stream = null;
		this.peer = null;
	}

	async call(to: string){
		try {
			console.log(`Call ${to}`);
			const stream = await this.getStream();
			return this.peer?.call(to, stream, {});
		}
		catch (e) {
			console.log(e);
		}
	}
}

export default new PeerService();
