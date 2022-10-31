import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Search from '../Search/Search';

const Modal = ({ isOpen, closeModal, onNavigate }) => {
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
            <div className="fixed inset-0 z-20 bg-overlay	 dark:bg-overlay-dark" />
          </Transition.Child>

          <div className="fixed inset-0 z-20 ">
            <div className=" absolute  top-1/3  left-1/2 min-h-full -translate-x-1/2  text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-[300px] transform overflow-hidden bg-body px-4 py-6 text-center align-middle  transition-all  dark:bg-body-dark  dark:text-font-light xs:w-[335px] sm:w-[440px]  md:w-[704px] xl:w-[1200px]  xl:rounded ">
                  <Search onNavigate={onNavigate} closeModal={closeModal} />
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
