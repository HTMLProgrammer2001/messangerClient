import React from 'react';

import styles from './styles.module.scss';
import ClosePopUp from '../../Common/ClosePopUp';


const AboutPopup: React.FC<{}> = () => (
	<div className={styles.wrapper}>
		<div className={styles.header}>
			<h3>About</h3>
			<ClosePopUp/>
		</div>

		<div className={styles.content}>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto necessitatibus eaque blanditiis consequuntur sequi saepe earum fugiat exercitationem quos beatae, voluptas facilis harum ab qui, vitae ullam iusto neque itaque.
			</p>

			<p>GNU version 2.3</p>
		</div>
	</div>
);

export default AboutPopup;
