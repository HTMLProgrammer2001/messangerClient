import React from 'react';
import {CSSTransition} from 'react-transition-group';

import PopUpContext from '../../../utils/context/PopUpContext';
import styles from './styles.module.scss';
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
