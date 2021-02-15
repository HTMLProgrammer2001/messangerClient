import React, {useContext, useEffect, useRef} from 'react';

import CropAnimation from './CropAnimation';
import styles from './styles.module.scss';

import PopUpContext from '../../../utils/context/PopUpContext';


type ICropFormProps = {
	onChange: (blob: Blob) => void,
	img: HTMLImageElement
}

const CropForm: React.FC<ICropFormProps> = ({onChange, img}) => {
	const {setElement} = useContext(PopUpContext);

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

		//change elem size
		elem.current.width = img.width;
		elem.current.height = elem.current.clientWidth / img.width * img.height;

		animation = new CropAnimation(elem.current, img, {});
	}, [elem.current, img]);

	const save = async () => {
		let blob = await animation.getData();
		setElement(null);
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

					<canvas ref={elem} id="cropField" style={{maxWidth: '75vw', maxHeight: '75vh'}}>
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
