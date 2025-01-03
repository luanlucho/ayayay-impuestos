// Interfaces and types from component Providers
import { ReactNode } from "react";

// Component Props
export default interface ProvidersProps {
  children: ReactNode;
  cookies: CookieRecord[];
}

export interface CookieRecord {
  name: string;
  value: string;
}