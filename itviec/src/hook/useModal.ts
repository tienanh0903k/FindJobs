"use client"

import { useState } from "react";

const useModal = ():{
  openModal: boolean;
  handleOpenModal: () => void;
} => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return {
    openModal,
    handleOpenModal
  }
}

export default useModal
