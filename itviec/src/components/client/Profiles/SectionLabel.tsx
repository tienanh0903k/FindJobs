import React from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

// Định nghĩa type cho props
type SectionListBlockProps<T> = {
  title: string;
  items: T[];
  fields: Array<keyof T>;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  emptyText?: string;
};

function SectionListBlock<T>({
  title,
  items,
  fields,
  onAdd,
  onEdit,
  onDelete,
  emptyText = "Chưa có thông tin",
}: SectionListBlockProps<T>) {
  return (
    <section className="relative border bg-white p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onAdd} title={`Thêm ${title.toLowerCase()}`}>
          <FiPlus className="text-green-600" />
        </button>
      </div>
      {items && items.length > 0 ? (
        items.map((item, idx) => (
          <div key={idx} className="mb-4 border-b pb-2 relative group">
            {fields.map((field, i) => {
              const value = item[field];
              if (!value) return null;
              return (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg font-semibold"
                      : "text-gray-700"
                  }
                >
                  {String(value)}
                </p>
              );
            })}
            <div className="absolute top-0 right-0 flex space-x-1 opacity-80 group-hover:opacity-100">
              <button onClick={() => onEdit(item)}>
                <FiEdit className="text-blue-500" />
              </button>
              <button onClick={() => onDelete(item)}>
                <FiTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">{emptyText}</p>
      )}
    </section>
  );
}

export default SectionListBlock;
