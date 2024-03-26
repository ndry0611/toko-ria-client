import classes from "./Content.module.css";

export function Content({ children }: { children: React.ReactNode }) {
  return <div className={classes.content}>{children}</div>;
}
