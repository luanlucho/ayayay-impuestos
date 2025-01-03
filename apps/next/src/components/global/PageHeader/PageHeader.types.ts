// PageHeader types and interfaces

// Component Props
export interface PageHeaderProps {
  className?: string;
  titleClassName?: string;
  title: string;
  withGoBack?: boolean;
  childrenLeft?: React.ReactNode;
  childrenRight?: React.ReactNode;
}
