import React from 'react';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { twMerge } from 'tailwind-merge';

interface ButtonProp {
  className?: string; 
  text: string;      
  handleFunc: () => void; 
}

const Button: React.FC<ButtonProp> = ({ className, text, handleFunc }) => {
  return (
    <button
      onClick={handleFunc}
      className={twMerge(
        `flex flex-row justify-center gap-2 bg-blue-400 px-3 py-2 rounded-md text-white`,
        className 
      )}
      type="button" 
    >
      <AssignmentTurnedInIcon />
      {text}
    </button>
  );
};

export default Button; 
