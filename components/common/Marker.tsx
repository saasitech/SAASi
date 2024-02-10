import { cn } from "@/lib/utils";

interface MarkerProps {
  muted?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Marker = (props: MarkerProps) => (
  <div
    className={cn(
      "rounded-full",
      props.muted ? "" : "bg-secondary/20 text-secondary",
      props.className
    )}
  >
    {props.children}
  </div>
);
