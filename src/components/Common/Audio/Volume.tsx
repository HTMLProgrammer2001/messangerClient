import React, {useRef, useState} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';


type IVolumeProps = {
	val: number,
	onChange: (val: number) => void
};

const Volume: React.FC<IVolumeProps> = ({onChange, val}) => {
	//state
	const [isHover, setHover] = useState(true);

	//refs
	const line = useRef<HTMLDivElement>(null);

	//handlers
	const move = (e: MouseEvent) => {
			if(!line.current)
				return;

			//calculate position
			let rect = line.current.getBoundingClientRect(),
				y = 100 - (e.clientY - rect.top - 5) / (rect.height) * 100;

			y = y < 0 ? 0 : (y > 100 ? 100 : y);

			//set volume
			onChange(y);
		},
		up = (e: MouseEvent) => {
			//clear handlers
			document.body.onmouseup = null;
			document.body.onmousemove = null;

			if(!line.current)
				return;

			//calculate position
			let rect = line.current.getBoundingClientRect(),
				y = 100 - (e.clientY - rect.top - 5) / (rect.height) * 100;

			y = y < 0 ? 0 : (y > 100 ? 100 : y);

			//set volume
			onChange(y);
		},
		down = (e: React.MouseEvent) => {
			//set handlers
			document.body.onmousemove = move;
			document.body.onmouseup = up;

			e.preventDefault();
		};

	return (
		<div
			className={styles.volume}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<i
				className={cn('fas', styles.volume_icon, {
					'fa-volume-up': val > 50,
					'fa-volume-down': val > 0 && val <= 50,
					'fa-volume-off': val == 0
				})}
				onClick={() => onChange(val == 0 ? 100 : 0)}
				title={val.toFixed(0).toString()}
			/>

			{
				isHover &&
					<div className={styles.volume_lineCont} ref={line} onClick={up as any}>
						<div className={styles.volume_line}>
							<span
								className={styles.volume_ball}
								style={{top: `${100 - val}%`}}
								onMouseDown={down}
							/>
						</div>
					</div>
			}
		</div>
	);
};

export default Volume;
