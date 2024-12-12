'use client';
import { ModalType } from '@/components/client/Profiles/ProfileInfo';
import { useState, useCallback } from 'react';


const useModal = () => {
	const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<any>(null);


	// const openModal = useCallback((type: ModalType, data: any = null) => {
  //   setVisible(true);
  //   setModalType(type);
  //   setModalData(data);
  // }, []);

  const openModal = useCallback((type: ModalType | null = null, data: any = null) => {
    setVisible(true);
    setModalType(type);
    setModalData(data);
  }, []);
  
	const closeModal = useCallback(() => {
    setVisible(false);
    setModalData(null); 
    setModalType(null);
  }, []);

	return { visible, modalType, modalData,  openModal, closeModal };
};

export default useModal;
