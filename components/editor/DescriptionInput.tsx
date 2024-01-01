import { usePricingStore } from "@/lib/store";
import ContentEditableInput from "./ContentEditable";

function EditButton(props) {
  return (
    <button
      key={props.cmd}
      onClick={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        evt.stopPropagation(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
      className="btn btn-xs btn-outline btn-circle"
    >
      {props.name || props.cmd}
    </button>
  );
}

export const DescriptionInput = () => {
  const pricingStore = usePricingStore((state) => state);
  const handleChange = (value) => {
    pricingStore.setDescription(value);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor="description" className="label-text flex-1">
          Description
        </label>
        <div className="space-x-1">
          <EditButton cmd="italic" name="i" />
          <EditButton cmd="bold" name="b" />
          <EditButton cmd="underline" name="u" />
        </div>
      </div>
      <ContentEditableInput
        value={pricingStore.description}
        onChange={handleChange}
      />
    </div>
  );
};
