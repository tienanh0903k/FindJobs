"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export const RootStyleRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Tạo cache cho style
  const [cache] = useState(() => createCache());

  // Sử dụng hook để chèn style vào trong HTML phía server
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
