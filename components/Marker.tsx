import { cn } from "@/lib/utils";

interface MarkerProps extends React.ComponentPropsWithoutRef<"div"> {
  muted?: boolean;
}

export const Marker = (props: MarkerProps) => (
  <div
    className={cn(
      "rounded-full",
      props.muted ? "" : "bg-primary/10 text-primary",
      props.className
    )}
    {...props}
  />
);
