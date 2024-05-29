"use client";

import Image from "next/image";
import { useEffect } from "react";

const Overlay = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 w-screen h-screen"
      onClick={onClose}
    >
      <div className="relative w-1/2 h-1/2">
        <Image
          src={image}
          alt="Document"
          layout="fill"
          objectFit="contain"
          className="rounded"
        />
      </div>
    </div>
  );
};

export default Overlay;
