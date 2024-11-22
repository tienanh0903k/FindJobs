"use client";

import React from 'react';
import { Modal, Button } from 'antd';

type ModalProps = {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode; 
  [key: string]: any;
};

const ModalGlobal = ({ visible, close, children, title, footer , className, ...props }: ModalProps) => {
  return (
    <Modal
      open={visible} 
      onCancel={close}
      title={title}
      footer={null}
      className={className}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default ModalGlobal;