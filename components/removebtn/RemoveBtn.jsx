"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const [conformationMessage, setConformationMessage] = useState(false);

  const removeTopic = async () => {
    if (conformationMessage) {
      try {
        const res = await fetch(`/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Error deleting topic");
        toast.success("Topic deleted successfully");
        router.refresh();
      } catch (e) {
        toast.error("Failed to delete topic");
        console.log(e.message);
      }
    }
    setConformationMessage(false);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setConformationMessage(true)}
            variant="outline"
            size="icon"
          >
            <Trash2 className="w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConformationMessage(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={async () => await removeTopic()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveBtn;
