export function PanelIcon({ name }: { name: 'grid' | 'refresh' | 'calendar' | 'account' | 'heart' | 'settings' | 'pin' | 'power' }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    refresh: <><path d="M20 10a8 8 0 1 0-2.3 7.7M20 4v6h-6"/></>,
    calendar: <><rect x="3" y="5" width="17" height="15" rx="3"/><path d="M3 10h17M7 3v4m8-4v4M7 14h2m3 0h2m-7 3h2"/></>,
    account: <><circle cx="10" cy="7" r="4"/><path d="M3 21v-3a7 7 0 0 1 11-5m4 1v8m-4-4h8"/></>,
    heart: <path d="M12 21 3 12C-2 5 7 0 12 7c5-7 14-2 9 5Z"/>,
    settings: <><path d="m9.5 3-.6 2.1-2 1.2-2.2-.5-2.5 4.4 1.5 1.6v2.4l-1.5 1.6 2.5 4.4 2.2-.5 2 1.2.6 2.1h5l.6-2.1 2-1.2 2.2.5 2.5-4.4-1.5-1.6v-2.4l1.5-1.6-2.5-4.4-2.2.5-2-1.2-.6-2.1Z" transform="translate(0 -1) scale(1 .96)"/><circle cx="12" cy="12" r="3.5"/></>,
    pin: <><path d="M8 3h8l-1 7 4 5v2H5v-2l4-5-1-7ZM12 17v5"/></>,
    power: <><path d="M12 3v8M6.3 5.8a8 8 0 1 0 11.4 0"/></>,
  };
  return <svg viewBox="0 0 24 24" fill={name === 'heart' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
