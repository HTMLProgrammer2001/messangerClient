import {createContext} from 'react';


type IPopUpContextData = {
	renderElements: Array<() => any>,
	setElement: (rElem: () => any) => void
};

const PopUpContext = createContext<IPopUpContextData>({
	renderElements: [],
	setElement: () => false
});

export default PopUpContext;
