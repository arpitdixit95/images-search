import {lazy} from 'react';
import { Close } from '@mui/icons-material';
import Modal from 'react-modal';
import './fullscreen-modal.scss';

const ImageItem = lazy(() => import('~/components/image-item'));

const FullscreenModal = ({ showModal, closeModal=()=>{}, modalData={} }) => {
  const {data} = modalData;
  return (
    <div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={'fullscreen-modal__content'}
        overlayClassName={'fullscreen-modal__overlay'}
        contentLabel="Example Modal"
      >
        <div className='fullscreen-modal__body'>
          <div className='fullscreen-modal__close-wrapper' onClick={closeModal}><Close /></div>
          <div className='fullscreen-modal__image-item'>
            <ImageItem
              imageData={data}
              imageKey={'raw'}
              imageWidth={'80vw'}
              maxHeight={'80vh'}
              calculateHeight={true}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FullscreenModal;

