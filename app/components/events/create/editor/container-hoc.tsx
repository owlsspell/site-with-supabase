import { EventsState } from "@/lib/features/eventDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { ReactNode } from "react";

type PropsData = {
    children: ReactNode,
    classes?: string,
    isOpened: boolean,
    field: keyof EventsState | "image",
    changeVisibility: (field: string, value: boolean) => void,
    image?: null | File
}

export default function ContainerHoc({ children, classes, isOpened, field, changeVisibility, image }: PropsData) {
    const event = useAppSelector((state: RootState) => state.eventData)

    const isAllFieldFull = () => {
        if (field === "image") return !!image
        if (!event[field]) return false

        if (field === 'dateAndLocation') {
            const { location, isOnline, ...newObj } = event[field];
            let isFullField = Object.values(newObj).every((item) => item !== null && item.length > 0 || !!item)
            return (isOnline || location.length > 0) && isFullField
        }
        if (field === 'category') {
            const { subCategory, ...newObj } = event[field];
            return Object.values(newObj).every((item) => item !== null && item.length > 0 || !!item)
        }
        else return Object.values(event[field]).every((item) => item !== null && item.length > 0 || !!item)
    }
    const handleClick = () => {
        if (isOpened) return
        changeVisibility(field, true)
    }
    return (
        <div className={`editor_section-gray ${classes ?? ""}`} onClick={handleClick}>
            {children}
            <div className="editor_upload-icon" onClick={() => changeVisibility(field, !isOpened)}>
                {(field === "image" || event[field]) && isAllFieldFull() ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>X</div>
                        : <div className="icon">+</div>
                }
            </div>
        </div>
    )
}
