import React from 'react';

import PopUpContext from '../../../utils/context/PopUpContext';
import Content from './Content';


const PopUpElement: React.FC<{}> = () => (
	<PopUpContext.Consumer> 
		{
			({renderElements, setElement}) => {
				if(!renderElements.length)
					return;

				const handler = (e: React.MouseEvent) => {
					setElement(null);
				};

				return (
					<>
						{
							renderElements.map((elem, key) => (
								<Content handler={handler} RenderElement={elem} key={key}/>
							))
						}
					</>
				);
			}
		}
	</PopUpContext.Consumer>
);

export default PopUpElement;
