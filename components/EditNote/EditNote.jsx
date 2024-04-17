"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { MessageSquareX, Save } from "lucide-react";
import { Label } from "../ui/label";

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditNote = ({ id, title, description, author, tags, websiteLink }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags.join(", "));
  const [newWebsiteLink, setNewWebsiteLink] = useState(websiteLink);
  const [charCount, setCharCount] = useState(0);

  const route = useRouter();

  // resize textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newDescription]);

  // Max character count for description
  const maxCharCount = 350;
  const handelDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setNewDescription(text);
      setCharCount(text.length);
    }
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      toast.warning("Please fill all the fields");
      return;
    }

    // validate URL if provided
    if (newWebsiteLink && !isValidUrl(newWebsiteLink)) {
      toast.warning("Please enter a valid website link (if provided).");
      return;
    }

    const tagArray =
      newTags && newTags.trim() !== ""
        ? newTags
            .trim()
            .split(/[\s,]+/)
            .filter(Boolean)
        : [];

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newTags: tagArray,
          newWebsiteLink,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to Edit note.");
      }
      toast.success("Note Updated Successfully.");
      route.back();
      route.refresh();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Create Note banner  */}
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Any Changes?
        </h1>
        <h1 className="text-xl md:text-2xl my-2">
          Dont worry! You are at right place.
        </h1>
      </div>
      <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
        {/* Title input field */}
        <Input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
          name="title"
          id="title"
          placeholder="Title of the Note..."
          className="shadow px-4 py-6 text-lg font-bold"
        />

        {/* Description text area */}
        <Textarea
          ref={textareaRef}
          onChange={handelDescriptionChange}
          value={newDescription}
          placeholder={`Please fill the Details about the note`}
          className={`shadow px-4 py-3 font-bold min-h-32 overflow-hidden`}
        />
        <p className="font-bold text-right text-sm text-gray-500">
          {charCount}/{maxCharCount}
        </p>
        {/* Website Link input field */}
        <Input
          onChange={(e) => {
            setNewWebsiteLink(e.target.value);
          }}
          value={newWebsiteLink}
          type="text"
          name="websiteLike"
          id="websiteLike"
          placeholder="https://attach website link if any (Optional)"
          className="shadow px-4 py-5 font-bold"
        />

        {/* Tags text area */}
        <Label
          htmlFor="tags"
          className="font-bold md:text-base pl-1 mt-2 text-gray-500"
        >
          Keyword: sepereated by comma or space for multiple keyword (search
          purpose).
        </Label>

        <Input
          onChange={(e) => {
            setNewTags(e.target.value);
          }}
          value={newTags}
          type="text"
          name="tags"
          id="tags"
          placeholder="keyword1, keyword2, ... (Optional)"
          className="shadow px-4 py-5 font-bold"
        />

        {/* Buttons */}
        <div className="ml-auto">
          {/* Cancel Button */}
          <Link href={`/profile/${author?._id}/details`}>
            <Button variant={`outline`} className="font-bold w-fit mr-3">
              <MessageSquareX className="w-4 mr-1" />
              Cancel
            </Button>
          </Link>

          {/* Save Button */}
          <Button
            type={`submit`}
            variant={`outline`}
            className="font-bold w-fit"
          >
            <Save className="w-4 mr-1" />
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditNote;
