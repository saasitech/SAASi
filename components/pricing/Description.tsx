import { TierItem } from "@/lib/store";

export const Description = (item: TierItem) => {
  return <div className="text-base-content text-sm">{item.description}</div>;
};
