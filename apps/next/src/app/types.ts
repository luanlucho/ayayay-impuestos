export interface RootLayoutProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageProps {}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface MetadataProps {
  params: any;
}
