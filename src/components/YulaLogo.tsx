interface YulaLogoProps {
  size?: number;
  className?: string;
}

export default function YulaLogo({ size = 24, className = "" }: YulaLogoProps) {
  const gradId = `yula-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="55%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Left arm — parallelogram angled toward center */}
      <path
        d="M8 8 L22 8 L36 32 L22 32 Z"
        fill={`url(#${gradId})`}
      />
      {/* Right arm — parallelogram angled toward center */}
      <path
        d="M56 8 L42 8 L28 32 L42 32 Z"
        fill={`url(#${gradId})`}
      />
      {/* Bottom stem */}
      <path
        d="M26 30 L38 30 L36 56 L28 56 Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

export function YulaWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <YulaLogo size={24} />
      <span className="text-lg font-bold tracking-tight text-white">Yula</span>
    </div>
  );
}
