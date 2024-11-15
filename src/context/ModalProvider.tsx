// context/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
  isVisible: boolean;
}

// Tạo Context
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Tạo Modal Provider
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook để sử dụng Modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal phải được sử dụng trong ModalProvider");
  }
  return context;
};
