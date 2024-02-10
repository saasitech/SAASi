import { cn } from "@/lib/utils";

export function ContentEditButton(props) {
  return (
    <div
      className={cn("inline-block tooltip", props.className)}
      data-tip={props.cmd}
    >
      <button
        key={props.cmd}
        onClick={(evt) => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          evt.stopPropagation(); // Avoids loosing focus from the editable area
          if (props.cmd === "createLink") {
            const url = prompt("Enter url:") || "/";
            document.execCommand(
              "insertHTML",
              false,
              `<a class="link href="${url}" target="_blank">${document.getSelection()}</a>`
            );
          } else {
            document.execCommand(props.cmd, false, props.arg);
          }
        }}
        className="btn btn-xs btn-outline btn-circle"
      >
        {props.name || props.cmd}
      </button>
    </div>
  );
}
