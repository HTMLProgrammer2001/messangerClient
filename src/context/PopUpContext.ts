import {createContext} from 'react';


type IPopUpContextData = {
	renderElement: () => any,
	setElement: (rElem: () => any) => void
};

const PopUpContext = createContext<IPopUpContextData>({
	renderElement: null,
	setElement: () => false
});

export default PopUpContext;
