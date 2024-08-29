import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { EventState } from "@/types/custom-types";
import { ReactNode } from "react";

type PropsData = {
    children: ReactNode,
    classes?: string,
    errors: boolean | undefined,
    touched: boolean | undefined,
    isOpened: boolean,
    field: string,
    changeVisibility: (field: string, value: boolean) => void,
    image?: null | File
}

export default function ContainerHoc({ children, classes, errors, touched, isOpened, field, changeVisibility, image }: PropsData) {


    const isAllFieldFull = () => {
        // if (field === "image") return !!image
        // if (!event[field]) return false

        // if (field === 'dateAndLocation') {
        //     const { location, isOnline, ...newObj } = event[field];
        //     let isFullField = Object.values(newObj).every((item) => item !== null && item.length > 0 || !!item)
        //     return (isOnline || location.length > 0) && isFullField
        // }
        // if (field === 'category') {
        //     const { subCategory, ...newObj } = event[field];
        //     return Object.values(newObj).every((item) => item !== null && item.length > 0 || !!item)
        // }
        // else return Object.values(event[field]).every((item) => item !== null && item.length > 0 || !!item)
        // return Object.keys(dirtyFields).includes()
    }
    const handleClick = () => {
        if (isOpened) return
        changeVisibility(field, true)
    }
    // console.log('errors hoc', errors);
    // console.log('touched hoc', touched);
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
