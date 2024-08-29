import React, { Ref, useEffect, useRef, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { useField } from 'react-final-form';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

export default function AboutEvent({ isOpened }: { isOpened: boolean }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorRef = useRef()
    const toolbar = {
        options: ['blockType', 'inline', 'textAlign', 'list', 'link', 'fontSize', 'colorPicker'],
        blockType: {
            options: ['Normal', 'H2', 'H3', 'H5', 'Blockquote']
        },
        inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline'],
        },
        list: {
            inDropdown: false,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
        },
        textAlign: {
            className: 'editor_field_text-align',
            inDropdown: true,
            options: ['left', 'center', 'right']
        },
        link: {
            inDropdown: false,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link'],
            popupClassName: "link-modal",
        },
        fontSize: {
            options: [10, 11, 12, 14, 16, 18, 24, 30, 36],
        },
    }
    const about = useField('about')

    useEffect(() => {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        if (html === "<p></p>\n") return about.input.onChange("")
        about.input.onChange(html)
    }, [editorState]);

    function createMarkup(html: any) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const onEditorChange = (editorState: any) => {
        setEditorState(editorState);
    }
    const setEditorReference = (ref: any) => {
        if (!ref) return
        editorRef.current = ref;
        ref.focus();
        about.input.onBlur()
    }
    return (
        <div className='editor_title'>
            {isOpened ? <>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={toolbar}
                    editorRef={setEditorReference}
                />
            </>
                : about.input.value.length > 0 ?
                    <>
                        <div
                            className="preview"
                            dangerouslySetInnerHTML={createMarkup(about.input.value)}>
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
