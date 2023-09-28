import  { FC } from 'react'
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

const extensions = [
    StarterKit,
    Table.configure({
        resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
];

interface Props{
    content:string;
}

const TipTap:FC<Props> = ({content}) => {
    return (
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}>
            
        </EditorProvider>

    );
}

export default TipTap