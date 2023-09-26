import {FC} from 'react'
import ProjectModal from '../Modals/ProjectModal'
import DeleteProjectModal from '../Modals/DeleteProjectModal'
import UploadPictureModal from '../Modals/UploadPictureModal'
import DeletePictureModal from '../Modals/DeletePictureModal'
import QuotationModal from '../Modals/QuotationModal'

const ModalProvider:FC = () => {
    return (
        <>
            <DeleteProjectModal />
            <ProjectModal />
            <UploadPictureModal />
            <DeletePictureModal />
            <QuotationModal />
        </>
    )
}

export default ModalProvider