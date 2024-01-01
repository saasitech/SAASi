import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

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
      allowedAttributes: { a: ["href"] },
    };
    const newValue = sanitizeHtml(evt.target.value, sanitizeConf);
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
