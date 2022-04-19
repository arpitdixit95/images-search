import {lazy} from 'react';
import { Close } from '@mui/icons-material';
import Modal from 'react-modal';
import './fullscreen-modal.scss';

const FullscreenModal = ({ showModal, closeModal=()=>{}, modalData={}, parent }) => {
  if(!showModal){
    return null;
  }
  const {urls: {raw, thumb, small, regular}, alt_description} = modalData.data;
  Modal.setAppElement(parent);
  return (
    <div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={'fullscreen-modal__content'}
        overlayClassName={'fullscreen-modal__overlay'}
        contentLabel="Example Modal"
        parent={parent}
      >
        <div className='fullscreen-modal__body'>
          <div className='fullscreen-modal__close-wrapper' onClick={closeModal}><Close /></div>
          <div className='fullscreen-modal__image-item' >
            <picture className='fullscreen-modal__picture'>
              <source media="(max-device-width: 360px)" srcSet={thumb} />
              <source media="(max-device-width: 560px)" srcSet={small} />
              <source media="(max-device-width: 1240px)" srcSet={regular} />
              <img alt={alt_description} src={raw} className='fullscreen-modal__image'/>
            </picture>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FullscreenModal;

