import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Search from '../Search/Search';
import PropTypes from 'prop-types';
// import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ isOpen, closeModal }) => {
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="overlay	dark:bg-overlay-dark" />
          </Transition.Child>

          <div className="modal-wrap">
            <div className="modal">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-panel">
                  <Search closeModal={closeModal} />
                  {/* <XMarkIcon
                    className="xMarkIcon dark:text-font-light"
                    onClick={closeModal}
                  /> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
