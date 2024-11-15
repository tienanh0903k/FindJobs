"use client";

import React from 'react';
import { Modal, Button } from 'antd';

type ModalProps = {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
  title?: string; // Tùy chọn tiêu đề
};

const ModalGlobal = ({ visible, close, children, title }: ModalProps) => {
  return (
    <Modal
      visible={visible}
      onCancel={close}
      title={title}
      footer={[
        <Button key="close" onClick={close}>
          Close
        </Button>
      ]}
      className="custom-modal" // Có thể thêm các lớp tùy chỉnh ở đây
    >
      {children}
    </Modal>
  );
};

export default ModalGlobal;
