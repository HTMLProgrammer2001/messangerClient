import {createContext} from 'react';


type IPopUpContextData = {
	renderElement: Array<() => any>,
	setElement: (rElem: () => any) => void
};

const PopUpContext = createContext<IPopUpContextData>({
	renderElement: [],
	setElement: () => false
});

export default PopUpContext;
