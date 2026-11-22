import type { ReactNode } from "react";

type NotesLayoutProps = {
  children: ReactNode;
};

const NotesLayout = ({ children }: NotesLayoutProps) => {
  return <div className="h-full overflow-auto">{children}</div>;
};

export default NotesLayout;
