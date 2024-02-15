import { logoSizes } from "@/lib/constants";

export default function Logo(props) {
  return props.src ? (
    <img
      {...props}
      style={{
        height: logoSizes[props.size] || logoSizes.md,
        width: "auto",
      }}
    />
  ) : null;
}
