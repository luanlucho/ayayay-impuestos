// AsideMenu helper functions and data
import { Crown, Gift, ShoppingCart, Megaphone } from "lucide-react";
import { CalendarDays, Truck, Store } from "lucide-react";
import { Users, LineChart, Settings } from "lucide-react";
import { Network, MessagesSquare, FlaskConical } from "lucide-react";

import { NavigationMenuItem } from "../navigationMenu/VerticalNavigationMenu/VerticalNavigationMenu.types";

export const menuItems: NavigationMenuItem[] = [
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: Megaphone
  },
  {
    title: "Rewards",
    href: "/rewards",
    icon: Gift
  },
  {
    title: "Tiers",
    href: "/tiers",
    icon: Crown
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingCart
  },
  {
    title: "Stores",
    href: "/stores",
    icon: Store
  },
  {
    title: "Channels",
    href: "/channels",
    icon: Truck
  },
  {
    title: "Events",
    href: "/events/history",
    icon: CalendarDays
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
    separator: true
  },
  {
    title: "Feedback forms",
    href: "/feedback-forms",
    icon: MessagesSquare,
    soon: true
  },
  {
    title: "Marketing automation",
    href: "/marketing-automation",
    icon: Network,
    soon: true
  },
  {
    title: "Playground",
    href: "/playground",
    icon: FlaskConical,
    soon: true,
    separator: true
  },
  {
    title: "Analytics",
    href: "/analytics/overview",
    base: "/analytics",
    icon: LineChart,
    soon: true
  },
  {
    title: "Settings",
    href: "/settings/account",
    base: "/settings",
    icon: Settings
  }
];
