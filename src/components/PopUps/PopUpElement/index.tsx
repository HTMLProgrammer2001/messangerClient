import React from 'react';
import {CSSTransition} from 'react-transition-group';

import PopUpContext from '../../../utils/context/PopUpContext';
import styles from './styles.module.scss';
import Content from './Content';


const PopUpElement: React.FC<{}> = () => (
	<PopUpContext.Consumer> 
		{
			({renderElement, setElement}) => {
				if(!renderElement)
					return;

				const handler = (e: React.MouseEvent) => {
					setElement(null);
				};

				return (
					<div>
					<CSSTransition
						timeout={{enter: 200, exit: 700}}
						in={!!renderElement}
						classNames={{
							enter: styles.wr_enter,
							enterActive: styles.wr_enter_active,
							exit: styles.wr_exit,
							exitActive: styles.wr_exit_active
						}}
						onEntered={() => console.log('Test')}
					>
						<Content handler={handler} renderElement={renderElement}/>
					</CSSTransition>
					</div>
				);
			}
		}
	</PopUpContext.Consumer>
);

export default PopUpElement;
