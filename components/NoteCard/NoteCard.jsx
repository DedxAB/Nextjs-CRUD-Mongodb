"use client";
import { FilePenLine, Pencil, PencilLine } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import RemoveButton from "../RemoveButton/RemoveButton";
import dayjs from "dayjs";
// import Image from "next/image";
// import MyImage from "../MyImage/MyImage";

const NoteCard = ({ id, note, user }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  // console.log("note", note._id);
  // console.log(key);
  // console.log(session);

  /* Destructure the user  
    {
      _id: '65fda3f22f7ede6787e9f5af',
      email: 'arnab.iguniverse@gmail.com',
      name: 'Arnab Bhoumik',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocI1XTigSLw4VGEwGPKzRgn7G0h94GUPOupylNyMa9nBrA=s96-c',
      username: 'arnab.iguniverse',
      createdAt: '2024-03-22T15:29:54.498Z',
      updatedAt: '2024-03-27T10:04:57.356Z',
      __v: 0,
      notes: [
        {
          _id: '6603ef492123d9a648fbd1f1',
          title: 'Topic profile  note',
          description: 'profile description',
          author: '65fda3f22f7ede6787e9f5af',
          createdAt: '2024-03-27T10:04:57.267Z',
          updatedAt: '2024-03-27T10:04:57.267Z',
          __v: 0
        }
      ]
    }
  */

  return (
    <>
      <div
        className="border flex justify-start gap-1 mb-3 rounded px-3 md:px-4 py-3 shadow cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
        key={id}
      >
        {/* Show the author image */}
        <Link href={`/profile/${user?._id}`} className="my-1 mr-2">
          <Avatar>
            <AvatarImage src={user?.image} referrerPolicy="no-referrer" />
          </Avatar>
          {/* <MyImage src={user?.image} /> */}
        </Link>
        <div className="w-full">
          {/* Show the author name, username */}
          <div className="flex flex-wrap items-center text-xs">
            <Link
              href={`/profile/${user?._id}`}
              className="flex flex-wrap  items-center mr-2"
            >
              {/* name  */}
              <p className="font-bold mr-1">{user?.name}</p>

              {/* username */}
              <p className="text-gray-500">@{user?.username}</p>
            </Link>
            {/* Show the edited date if updated */}
            {note?.updatedAt !== note?.createdAt && (
              <div className="flex items-center text-gray-500 justify-between">
                {/* <FilePenLine className="w-3 mr-1" /> */}
                <PencilLine className="w-3 mr-1" />
                <p>edited</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-1">
            {/* Show the title and date */}
            <div>
              {/* title  */}
              <h2 className="text-base md:text-lg font-bold underline">
                {note?.title}
              </h2>

              {/* date */}
              <div className="flex flex-wrap justify-start items-center text-[#6b6e6e]">
                <div className="text-xs mr-2">
                  {/* {new Date(note?.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })} */}
                  {
                    dayjs(note?.createdAt).format("MMM D, YYYY") // Mar 27, 2024
                  }
                </div>
              </div>
            </div>

            {/* Show Edit and remove button based on user who created this note */}
            {/* {alert(session?.user?.id)} */}
            {session?.user?.id === note?.author &&
              pathName === `/profile/${user?._id}` && (
                <div className="min-w-20">
                  {/* Add the edit button */}
                  <Link href={`/edit-note/${note?._id}`}>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="w-4" />
                    </Button>
                  </Link>
                  {/* Add the remove button */}
                  <RemoveButton id={note?._id} />
                </div>
              )}
          </div>

          {/* Show the description */}
          <div className="flex justify-between items-cente mt-2">
            <h2 className="text-sm font-bold py-1">{note?.description}</h2>
          </div>

          {/* Show the tags */}
          <div>
            <span className="text-sm hover:underline">#nextjs</span>
          </div>

          {/* Show the likes and comments */}
          <div className="flex gap-5 mt-3">
            {/* Likes  */}
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span className="text-sm font-bold">200 Likes</span>
            </div>

            {/* Comments */}
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <span className="text-sm font-bold">5 Comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;