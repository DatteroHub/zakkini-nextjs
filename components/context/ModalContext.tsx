import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isOpen: false,
  isPreventClose: false,
  openModal: () => {},
  closeModal: () => {},
  enablePreventClose: () => {},
  disablePreventClose: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreventClose, setIsPreventClose] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () =>  setIsOpen(false);
  const enablePreventClose = () => setIsPreventClose(true);
  const disablePreventClose = () => setIsPreventClose(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        isPreventClose,
        enablePreventClose,
        disablePreventClose,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
