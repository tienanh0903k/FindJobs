import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload, AiOutlineFileText, AiOutlineDelete } from 'react-icons/ai';

interface DropFilesProps {
  wrapperClass?: string;
  onChange: (files: any[]) => void; // Chuyển đổi sang mảng File[]
  defaultFiles?: File[];
  multiple?: boolean;
}

const DropFiles: React.FC<DropFilesProps> = ({
  wrapperClass = '',
  onChange, 
  defaultFiles = [],
  multiple = false,
}) => {
  const [files, setFiles] = useState<File[]>(defaultFiles);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles); // Trả về mảng File[] thay vì FileList
    }
  }, [files, onChange, multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple,
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles); // Trả về mảng File[]
    }
  };

  return (
    <div className={`p-4 border rounded ${wrapperClass}`}>
      <div {...getRootProps()} className="flex items-center space-x-2 cursor-pointer border-2 border-dashed p-4 hover:border-blue-400 transition">
        <AiOutlineCloudUpload size={24} className="text-gray-500" />
        <input {...getInputProps()} />
        <p className="text-gray-700 font-semibold">
          Tải lên CV từ máy tính, chọn hoặc kéo thả
        </p>
      </div>
      
      <p className="text-gray-500 text-sm mt-1">Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB</p>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div key={file.name} className="flex items-center space-x-2">
              <AiOutlineFileText size={24} className="text-green-500" />
              <p className="text-green-600">{file.name}</p>
              <button onClick={() => removeFile(file)} className="text-red-500">
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropFiles;
