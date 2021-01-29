import React from 'react';
import {useSelector} from 'react-redux';

import {selectCallState} from '../../../redux/call/slice';
import PopUpContext from '../../../utils/context/PopUpContext';
import Content from './Content';
import CallPopUp from '../Call';


const PopUpElement: React.FC = () => {
	const {isCalling, isSpeaking} = useSelector(selectCallState);

	return (
		<PopUpContext.Consumer>
			{
				({renderElements, setElement}) => {
					if (!renderElements.length && !isCalling && !isSpeaking)
						return;

					const handler = () => setElement(null);

					return (
						<>
							{renderElements.map((elem, key) => (
								<Content handler={handler} RenderElement={elem} key={key}/>
							))}

							{
								(isCalling || isSpeaking) &&
								<Content handler={handler} RenderElement={() => <CallPopUp/>}/>
							}
						</>
					);
				}
			}
		</PopUpContext.Consumer>
	);
};

export default PopUpElement;
