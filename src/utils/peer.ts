import Peer, {MediaConnection} from 'peerjs';


class PeerService{
	private peer: Peer = null;
	private stream: MediaStream = null;
	private peerID: string = null;
	private streamHandler: any = null;

	async open(userID: string){
		if(this.peer && !this.peer.disconnected && this.peerID == userID)
			return;

		this.peer = new Peer(userID, {
			host: process.env.WEBRTC_HOST || 'localhost',
			port: +process.env.WEBRTC_PORT || 9000
		});

		this.peerID = userID;

		this.peer.on('call', (call: MediaConnection) => {
			alert('Call');
			this.getStream().then(stream => {
				call.answer(stream);

				call.on('stream', (userStream) => {
					if(this.streamHandler)
						this.streamHandler(userStream);
				});
			});
		});
	}

	getID(): string{
		return this.peerID;
	}

	setHandler(fn: any){
		this.streamHandler = fn;
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

	disconnect(){
		//stop stream
		this.stream?.getTracks().forEach(track => track.stop());

		//disconnect
		this.peer?.disconnect();

		//reset data
		this.stream = null;
		this.peer = null;
	}

	async call(to: string){
		try {
			const stream = await this.getStream();
			const call = this.peer?.call(to, stream);

			call.on('stream', this.streamHandler);
		}
		catch (e) {
			console.log(e);
		}
	}
}

export default new PeerService();
