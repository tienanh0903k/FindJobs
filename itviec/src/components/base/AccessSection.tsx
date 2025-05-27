'use client';

import React from 'react';

interface AccessSectionProps {
  user: any;
  children: React.ReactNode;
  onAllowed?: () => void;
  deniedMessage?: string;
}

const AccessSection: React.FC<AccessSectionProps> = ({
  user,
  children,
  onAllowed,
  deniedMessage = 'Bạn cần đăng nhập để thực hiện hành động này.',
}) => {
  const checkAccess = () => {
    if (!user) {
      alert(deniedMessage);
      return;
    }
    if (onAllowed) onAllowed();
  };

  return (
    <div onClick={checkAccess} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export default AccessSection;
