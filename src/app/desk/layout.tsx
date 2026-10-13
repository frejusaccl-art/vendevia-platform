import { DeskShell } from "@/components/desk-shell";

export default function DeskLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DeskShell>{children}</DeskShell>;
}
