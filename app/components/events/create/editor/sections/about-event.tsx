import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { RootState } from '@/lib/store';
import { isSomeFieldFull } from '@/lib/functions';
import DOMPurify from 'dompurify';

export default function AboutEvent({ isOpened }: { isOpened: boolean }) {
    const dispatch = useAppDispatch()
    const event = useAppSelector((state: RootState) => state.eventData.about)

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState<string | null>(null);
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    console.log(convertedContent);
    function createMarkup(html: any) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    console.log('editorState', editorState);
    return (
        <div className='editor_title'>
            {isOpened ? <>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={{ options: ['inline'] }}
                />
            </>
                : isSomeFieldFull(event) ?
                    <>
                        <div
                            className="preview"
                            dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                        </div>
                    </>
                    :
                    <>
                        <h3>About this event</h3>
                        <p>Use this section to provide more details about your event. You can include things to know, venue information, parking, accessibility options—anything that will help people know what to expect.</p>
                    </>
            }
        </div>
    )
}
