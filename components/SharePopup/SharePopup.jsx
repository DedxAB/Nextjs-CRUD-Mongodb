"use client";

import { BASE_URL } from "@/utils/constants";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function SharePopup({ handleShare, updatedNote }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${BASE_URL}/note/${updatedNote?._id}/details`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
        <div className="rounded-lg mt-15 w-80 p-6 relative border backdrop-blur-xl">
          {/* Modal content */}
          <div className="mb-4">
            <h2 className="text-xl font-bold">Share Note</h2>
            <p className="text-gray-600 mt-2">{updatedNote?.title}</p>
          </div>

          {/* Form to enter email */}
          <div className="flex items-center gap-4">
            <FacebookShareButton
              url={`${BASE_URL}/note/${updatedNote?._id}/details`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`${BASE_URL}/note/${updatedNote?._id}/details`}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url={`${BASE_URL}/note/${updatedNote?._id}/details`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <button onClick={handleCopy} className="flex gap-1 items-center">
              {copied ? (
                <>
                  <Check className="text-green-500 w-7 h-7" />
                  <p>Copied</p>
                </>
              ) : (
                <>
                  <Clipboard className="text-primary w-7 h-7" />
                  <p>Copy</p>
                </>
              )}
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={handleShare}
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
