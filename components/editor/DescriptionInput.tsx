import { usePricingStore } from "@/lib/store";
import { ContentEditButton } from "../common/ContentEditableButton";
import ContentEditableInput from "./ContentEditable";

export const DescriptionInput = () => {
  const description = usePricingStore((state) => state.description);
  const setDescription = usePricingStore((state) => state.setDescription);

  const handleChange = (value) => {
    setDescription(value);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor="description" className="label-text flex-1">
          Description
        </label>
        <div className="space-x-1">
          <ContentEditButton cmd="italic" name="i" />
          <ContentEditButton cmd="bold" name="b" />
          <ContentEditButton
            cmd="underline"
            name="u"
            arg="https://saasi.vercel.app/terms"
            className="tooltip-top-left"
          />
        </div>
      </div>
      <ContentEditableInput value={description} onChange={handleChange} />
    </div>
  );
};
