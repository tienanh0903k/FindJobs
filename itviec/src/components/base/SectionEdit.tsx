import React, { useState } from 'react';

interface SectionEditProps {
	title?: string;
	content?: string;
	className?: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SectionEdit = ({ title, content, onInputChange, className, ...props }: SectionEditProps) => {
    const [valueContent, setValueContent] = useState(content);

	return (    
		<div
			className={className}
			contentEditable="true"
            onInput={(e) => {
                console.log(e.target);
            }}
			suppressContentEditableWarning={true}
			{...props}
		>

            {
                valueContent
            }
        </div>
	);
};

export default SectionEdit;
