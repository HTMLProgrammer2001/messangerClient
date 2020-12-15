import React from 'react';

import styles from './styles.module.scss';


const AboutPopup: React.FC<{}> = () => (
	<div className={styles.wrapper}>
		<h3 className={styles.header}>About</h3>

		<div className={styles.content}>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto necessitatibus eaque blanditiis consequuntur sequi saepe earum fugiat exercitationem quos beatae, voluptas facilis harum ab qui, vitae ullam iusto neque itaque.
			</p>

			<p>
				GNU version 2.3
			</p>
		</div>
	</div>
);

export default AboutPopup;
