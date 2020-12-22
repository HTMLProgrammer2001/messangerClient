import React from 'react';

import PopUpContext from '../../../utils/context/PopUpContext';
import Content from './Content';


const PopUpElement: React.FC<{}> = () => (
	<PopUpContext.Consumer> 
		{
			({renderElement, setElement}) => {
				if(!renderElement.length)
					return;

				const handler = (e: React.MouseEvent) => {
					setElement(null);
				};

				return (
					<div>
						{
							renderElement.map((elem, key) => (
								<Content handler={handler} RenderElement={elem} key={key}/>
							))
						}
					</div>
				);
			}
		}
	</PopUpContext.Consumer>
);

export default PopUpElement;
