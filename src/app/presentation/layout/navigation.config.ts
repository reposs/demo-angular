export interface NavLinkItem {
  label: string;
  path: string;
}

export const APP_NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.services', path: '/services' },
  { label: 'nav.about', path: '/about' },
  { label: 'nav.contact', path: '/contact' },
] as const;
