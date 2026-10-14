import "./vv.css";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="vv">{children}</div>;
}
