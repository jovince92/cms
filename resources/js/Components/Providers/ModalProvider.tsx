import {FC} from 'react'
import ProjectModal from '../Modals/ProjectModal'
import DeleteProjectModal from '../Modals/DeleteProjectModal'

const ModalProvider:FC = () => {
    return (
        <>
            <DeleteProjectModal />
            <ProjectModal />
        </>
    )
}

export default ModalProvider