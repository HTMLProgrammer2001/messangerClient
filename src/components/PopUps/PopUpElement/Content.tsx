import React from 'react';

import styles from './styles.module.scss';


type IContentProps = {
	handler: (e: React.MouseEvent) => void,
	renderElement: any
}

const Content: React.FC<IContentProps> = ({handler, renderElement}) => (
	<div className={styles.wrapper}>
		<span onClick={handler} className={styles.popUp_close}>
			&times;
		</span>

		<div className={styles.popUp}>
			<div className={styles.popUp_content}>
				{renderElement}
			</div>
		</div>
	</div>
);

export default Content;
