import {FC} from 'react'
import ProjectModal from '../Modals/ProjectModal'
import DeleteProjectModal from '../Modals/DeleteProjectModal'
import UploadPictureModal from '../Modals/UploadPictureModal'
import DeletePictureModal from '../Modals/DeletePictureModal'
import QuotationModal from '../Modals/QuotationModal'
import RequestModal from '../Modals/RequestModal'
import NewPhaseModal from '../Modals/NewPhaseModal'
import DeletePhaseModal from '../Modals/DeletePhaseModal'
import DeleteStageModal from '../Modals/DeleteStageModal'
import NewAddressModal from '../Modals/NewAddressModal'
import DeleteAddressModal from '../Modals/DeleteAddressModal'
import CancelQuotationModal from '../Modals/CancelQuotationModal'
import ApproveQuotationModal from '../Modals/ApproveQuotationModal'

const ModalProvider:FC = () => {
    return (
        <>
            <DeleteProjectModal />
            <ProjectModal />
            <UploadPictureModal />
            <DeletePictureModal />
            <QuotationModal />
            <RequestModal />
            <NewPhaseModal />
            <DeletePhaseModal />
            <DeleteStageModal />
            <NewAddressModal />
            <DeleteAddressModal />
            <CancelQuotationModal />
            <ApproveQuotationModal />
        </>
    )
}

export default ModalProvider