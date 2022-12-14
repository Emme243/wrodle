import { ReactNode, useEffect } from 'react';

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: IModalProps) {
  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-50 !m-0 flex h-full w-full items-center justify-center">
      <div
        className="absolute top-0 left-0 h-full w-full bg-modal-light/90 dark:bg-modal-dark/90"
        onClick={() => onClose()}
      />
      <div className="z-50 max-h-[90vh] w-96 overflow-y-auto rounded-md border border-black bg-modal-light py-6 px-4 dark:border-[#939b9f] dark:bg-modal-dark">
        {children}
      </div>
    </div>
  );
}

export default Modal;
