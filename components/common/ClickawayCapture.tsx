"use client";
import { useEffect } from "react";

export default function ClickawayCapture() {
  useEffect(() => {
    var details = [...document.querySelectorAll("details")];
    document.addEventListener("click", function (e) {
      const targetNode = e.target as Node;
      if (!details.some((f) => f.contains(targetNode))) {
        details.forEach((f) => f.removeAttribute("open"));
      }
    });
  }, []);
  return null;
}
