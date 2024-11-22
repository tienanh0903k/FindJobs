'use client';
import { ModalType } from '@/components/client/Profiles/ProfileInfo';
import { useState, useCallback } from 'react';

const useModal = () => {
	const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);


	const openModal = useCallback((type: ModalType) => {
    setVisible(true);
    setModalType(type);
  }, []);
	const closeModal = useCallback(() => {
    setVisible(false);
    setModalType(null);
  }, []);

	return { visible, modalType,  openModal, closeModal };
};

export default useModal;
