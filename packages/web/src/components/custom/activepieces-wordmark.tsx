import { t } from 'i18next';

import { cn } from '@/lib/utils';

const ActivepiecesWordmark = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-full w-auto text-foreground', className)}
    viewBox="0 0 160 36"
    fill="none"
    role="img"
    aria-label={t('logo')}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0, 4) scale(1.1)">
      <path
        d="M6.46013 8.81759C5.30809 7.10962 5.75876 4.79113 7.46672 3.63909C9.17469 2.48706 11.4932 2.93772 12.6452 4.64569L20.4261 16.1813C21.5781 17.8893 21.1274 20.2077 19.4195 21.3598C17.7115 22.5118 15.393 22.0611 14.241 20.3532L10.8676 15.3519C10.4339 14.8054 9.55114 14.8905 9.02108 15.4205C8.58152 15.8601 8.43761 16.9846 8.31301 17.9582C8.29474 18.1009 8.27689 18.2405 8.25858 18.3741C8.19097 19.0114 7.97092 19.6418 7.58762 20.2101C6.33511 22.067 3.81375 22.5565 1.95682 21.304C0.0998936 20.0515 -0.390738 17.5304 0.861776 15.6734C1.51136 14.7104 2.50224 14.1151 3.56472 13.9399L3.56322 13.9384C6.63307 13.4932 7.20222 10.0286 6.64041 9.08487L6.46013 8.81759Z"
        fill="#8142E3"
      />
    </g>
    <text
      x="32"
      y="24"
      fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      fontWeight="700"
      fontSize="22"
      letterSpacing="-0.5px"
    >
      <tspan fill="currentColor">Flow</tspan>
      <tspan fill="#8142E3">Lab</tspan>
    </text>
  </svg>
);

ActivepiecesWordmark.displayName = 'ActivepiecesWordmark';
export { ActivepiecesWordmark };
