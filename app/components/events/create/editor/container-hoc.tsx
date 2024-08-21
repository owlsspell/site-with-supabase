import { EventsState } from "@/lib/features/eventDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { ReactNode, useMemo } from "react";

export default function ContainerHoc({ children, classes, isOpened, field, changeVisibility }: { children: ReactNode, classes?: string, isOpened: boolean, field: keyof EventsState, changeVisibility: (field: string, value: boolean) => void }) {
    const event = useAppSelector((state: RootState) => state.eventData)

    const isAllFieldFull = () => {
        if (!event[field]) return false
        return Object.values(event[field]).every((item) => item !== null && item.length > 0 || !!item)
    }
    const handleClick = () => {
        if (isOpened) return
        changeVisibility(field, true)
    }
    return (
        <div className={`editor_section-gray ${classes ?? ""}`} onClick={handleClick}>
            {children}
            <div className="editor_upload-icon" onClick={() => changeVisibility(field, !isOpened)}>
                {event[field] && isAllFieldFull() ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>X</div>
                        : <div className="icon">+</div>
                }
            </div>
        </div>
    )
}
