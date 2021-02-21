import React from 'react';
import {Link} from 'react-router-dom';
import DialogLink from '../../components/Common/DialogLink';


const linkRegExp = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/igm,
	nickRegExp = /\@(\w+)/igm;

const parseNicks = (msg: string): React.Component => {
	let iterator = msg.matchAll(nickRegExp),
		result: any = [],
		lastIndex = 0;

	for(let data of iterator){
		result.push(msg.slice(lastIndex, data.index));
		result.push(<DialogLink text={data[0]} nick={data[1]}/>);

		lastIndex = data.index + data.input.length;
	}

	result.push(msg.slice(lastIndex));
	return result;
};

const parseMessage = (msg: string): React.Component => {
	let iterator = msg.matchAll(linkRegExp),
		result: any = [],
		lastIndex = 0;

	for(let data of iterator){
		result.push(parseNicks(msg.slice(lastIndex, data.index)));
		result.push(<a href={data[0]} target="_blank">{data[0]}</a>);

		lastIndex = data.index + data.input.length;
	}

	result.push(parseNicks(msg.slice(lastIndex)));
	return result;
};

export default parseMessage;
