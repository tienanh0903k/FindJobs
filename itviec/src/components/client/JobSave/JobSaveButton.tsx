'use client';
import { useState } from 'react';
import { Drawer } from "antd";

export default function JobSaveButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
         onClick={() => setOpen(true)}
        className="fixed bottom-10 right-4 z-50 mb-[125px] bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
        aria-label="Danh sách việc đã lưu"
        title="Việc đã lưu"
      >
        ❤️
      </button>

      <Drawer
        title="Danh sách việc đã lưu"
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        width={400}
      >
         <div>
          <p>Danh sách công việc đã lưu sẽ hiện ở đây.</p>
        </div>
      </Drawer>
    </>

  );
}
