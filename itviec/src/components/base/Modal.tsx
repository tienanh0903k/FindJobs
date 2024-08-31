interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
    actions?: React.ReactNode;
  }
export const Modal: React.FC<ModalProps> = () => {
	return <div>
        
    </div>;
};
