import React, {useCallback, useRef, useState} from 'react';

import styles from './styles.module.scss';


type ILineProps = {
	onChange: (val: number) => void,
	val: number
}

const Line: React.FC<ILineProps> = ({onChange, val}) => {
	//state
	const [isDrag, setDrag] = useState(false),
		[dragVal, setDragVal] = useState(0);

	const line = useRef<HTMLDivElement>(null);

	//handlers for event
	const move = useCallback((clientX: number) => {
			let rect = line.current.getBoundingClientRect(),
				x = (clientX - rect.left) / rect.width * 100;

			x = x < 0 ? 0 : (x > 100 ? 100 : x);

			setDragVal(x);
		}, [isDrag]),
		up = (clientX: number) => {
			setDrag(false);

			let rect = line.current.getBoundingClientRect(),
				x = (clientX - rect.left) / rect.width * 100;

			x = x < 0 ? 0 : (x > 100 ? 100 : x);

			onChange(x);

			document.body.onmouseup = null;
			document.body.onmousemove = null;
			document.body.ontouchend = null;
			document.body.ontouchmove = null;
		};

	//wrappers
	const onMouseUp = (e: MouseEvent) => {
			up(e.clientX);
		},
		onMouseMove = (e: MouseEvent) => {
			move(e.clientX)
		},
		onTouchMove = (e: TouchEvent) => {
			move(e.touches[0]?.clientX)
		},
		onTouchEnd = (e: TouchEvent) => {
			up(e.touches[0]?.clientX)
		},

		onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
			//change state
			setDrag(true);
			setDragVal(val);

			//set handlers
			document.body.onmouseup = onMouseUp;
			document.body.onmousemove = onMouseMove;
			document.body.ontouchmove = onTouchMove;
			document.body.ontouchend = onTouchEnd;

			//prevent dragging
			e.preventDefault();
		};

	const style = (isDrag ? dragVal : val) + '%';

	return (
		<div className={styles.audio_line} ref={line}>
			<span
				className={styles.audio_played}
				onClick={onMouseUp as any}
				style={{width: style}}
			/>

			<span
				className={styles.audio_ball}
				style={{marginLeft: style}}
				onMouseDown={onMouseDown}
				onTouchStart={onMouseDown}
				draggable={false}
			/>
		</div>
	);
};

export default Line;
