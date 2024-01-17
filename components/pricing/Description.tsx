import { TierItem } from "@/lib/types";

export const Description = (item: TierItem) => {
  return <div className="text-base-content text-sm">{item.description}</div>;
};
