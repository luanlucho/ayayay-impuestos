export interface RootLayoutProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ countryCode: string; year: string }>;
}

export interface PageProps {
  params: LayoutProps["params"];
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface MetadataProps {
  params: LayoutProps["params"];
}
