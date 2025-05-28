export const HeartOutline = ({ size = 24, color = "#10b981", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" fill="none"/>
      <path
        d="M12 19s-6-4.35-6-8.25C6 7.57 7.57 6 9.25 6c1.03 0 2.01.52 2.62 1.35A3.17 3.17 0 0114.75 6C16.43 6 18 7.57 18 10.75C18 14.65 12 19 12 19z"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
  
  // HeartFilled.jsx
  export const HeartFilled = ({ size = 24, color = "#10b981", ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" fill="white"/>
      <path
        d="M12 19s-6-4.35-6-8.25C6 7.57 7.57 6 9.25 6c1.03 0 2.01.52 2.62 1.35A3.17 3.17 0 0114.75 6C16.43 6 18 7.57 18 10.75C18 14.65 12 19 12 19z"
        fill={color}
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
  