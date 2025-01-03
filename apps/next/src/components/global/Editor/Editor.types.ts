// Editor types and interfaces

import { Editor } from "@monaco-editor/react";

// Component Props
export interface EditorProps extends React.ComponentProps<typeof Editor> {
  className?: string;
  wrapperClassName?: string;
}
