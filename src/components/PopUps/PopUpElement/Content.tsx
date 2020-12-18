import React from 'react';

import styles from './styles.module.scss';


type IContentProps = {
	handler: (e: React.MouseEvent) => void,
	RenderElement: any
}

const Content: React.FC<IContentProps> = ({handler, RenderElement}) => (
	<div className={styles.wrapper}>
		<span onClick={handler} className={styles.popUp_close}>
			&times;
		</span>

		<div className={styles.popUp}>
			<div className={styles.popUp_content}>
				<RenderElement/>
			</div>
		</div>
	</div>
);

export default Content;
