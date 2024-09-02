import { ReactNode } from "react";

type PropsData = {
    children: ReactNode,
    classes?: string,
    errors: string | boolean | undefined,
    touched: boolean | undefined,
    isOpened: boolean,
    field: string,
    changeVisibility: (field: string, value: boolean) => void,
    image?: null | File
}

export default function ContainerHoc({ children, classes, errors, touched, isOpened, field, changeVisibility, image }: PropsData) {
    const handleClick = () => {
        if (isOpened) return
        changeVisibility(field, true)
    }
    return (
        <div className={`editor_section-gray ${classes ?? ""}`} onClick={handleClick}>
            {children}
            <div className="editor_upload-icon" onClick={() => changeVisibility(field, !isOpened)}>
                {!errors && touched ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>X</div>
                        : <div className="icon">+</div>
                }

                {/* {(field === "image" || event[field]) && isAllFieldFull() ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>X</div>
                        : <div className="icon">+</div>
                } */}
            </div>
        </div>
    )
}
