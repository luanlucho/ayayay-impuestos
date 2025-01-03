// VerticalNavigationMenu helper functions and data

export const isItemActive = (
  pathname: string,
  href: string,
  base: string | undefined,
  sub?: boolean
) => {
  // Secondary menus parent gets active when any of its children is active
  if (base) return pathname.startsWith(base);
  // Sub menus parent gets active when any of its children is active
  if (sub) return pathname.startsWith(href);
  // Menu item of any level gets active when the pathname matches the href
  else return pathname === href;
};
