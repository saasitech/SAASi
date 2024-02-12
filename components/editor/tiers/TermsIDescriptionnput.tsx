import { usePricingStore } from "@/lib/store";
import { TierItem } from "@/lib/types";
import { ContentEditButton } from "../../common/ContentEditableButton";
import ContentEditableInput from "../ContentEditable";

export const TermsDescriptionInput = ({ tier }: { tier: TierItem }) => {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  const handleChange = (value) => {
    tier.terms = value;
    setTiers(tiers);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor="description" className="label-text flex-1">
          {tier.title} terms
        </label>
        <div className="space-x-1">
          <ContentEditButton cmd="italic" name="i" />
          <ContentEditButton cmd="bold" name="b" />
          <ContentEditButton cmd="underline" name="u" />
          <ContentEditButton
            cmd="createLink"
            name="a"
            arg="https://saasi.vercel.app/terms"
            className="tooltip-top-left"
          />
        </div>
      </div>
      <ContentEditableInput value={tier.terms} onChange={handleChange} />
    </div>
  );
};
