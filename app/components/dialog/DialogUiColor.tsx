import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faPalette, faAngleRight } from "@fortawesome/free-solid-svg-icons"

interface DialogUiColorInterface {
    handleDraw:(newOpen:boolean) => void,
    selectedColor:string,
    colorName:string,
}

const DialogUiColor: React.FC<DialogUiColorInterface> = ({handleDraw, selectedColor, colorName}) => {
    return (
        <button type="button" className="flex justify-between items-center py-2 px-1 w-full hover:bg-stone-100" onClick={() => handleDraw(true)}>
            <div style={{color: selectedColor}}>
                <FontAwesomeIcon icon={faPalette as IconProp} />
                <span className="ml-2">{colorName}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faAngleRight as IconProp} />
            </div>
        </button>
    );
}

export default DialogUiColor;