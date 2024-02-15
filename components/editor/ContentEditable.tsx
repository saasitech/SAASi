import { useRef } from "react";
import ContentEditable from "react-contenteditable";

export default function ContentEditableInput({ value, onChange }) {
  const text = useRef(value);
  const handleChange = (evt) => {
    const sanitizeConf = {
      allowedTags: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "p",
        "h1",
        "br",
        "span",
        "u",
      ],
      allowedAttributes: { a: ["href", "target"] },
    };
    // const newValue = sanitizeHtml(evt.target.value, sanitizeConf);
    const newValue = evt.target.value;
    text.current = newValue;
    onChange(newValue);
  };

  return (
    <ContentEditable
      html={text.current}
      onChange={handleChange}
      className="input input-bordered input-saasi h-auto min-h-[65px]"
    />
  );
}
