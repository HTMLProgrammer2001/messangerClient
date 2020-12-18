import React, {useEffect, useRef} from 'react';

import CropAnimation from './CropAnimation';
import styles from './styles.module.scss';


type ICropFormProps = {
	onChange: (blob: Blob) => void,
	img: HTMLImageElement
}

const CropForm: React.FC<ICropFormProps> = ({onChange, img}) => {
	let animation: CropAnimation = null,
		elem = useRef<HTMLCanvasElement>(null);

	//define destructor
	useEffect(() => {
		return () => {
			if(animation)
				animation.close();

			animation = null;
		}
	}, []);

	//on update
	useEffect(() => {
		if(!img || !elem.current)
			return;

		const newHeight = elem.current.offsetWidth/img.width * img.height;

		//change elem size
		elem.current.width = img.width;
		elem.current.height = img.height = newHeight;

		animation = new CropAnimation(elem.current, img, {});
	}, [elem.current, img]);

	const save = async () => {
		let blob = await animation.getData();
		onChange(blob);
	};

	return (
		<div className={styles.wrapper}>
			{img ?
				<>
					<div className={styles.header}>
						<div
							className={styles.saveBut}
							onClick={save}>Next</div>
					</div>

					<canvas ref = {elem} id="cropField" style={{width: '100%'}}>
						Canvas is not supported :(
					</canvas>
				</>
				:
				<div>No image</div>
			}
		</div>
	);
};

export default CropForm;
