import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import RemoveBtn from "../remove-button/RemoveBtnComp";
import { BASE_URL } from "@/utils/constants";

const getTopics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error fetching topics");
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const TopicList = async () => {
  const { topics } = await getTopics();

  return (
    <>
      {topics?.map((topic, index) => {
        return (
          <div
            className="border flex justify-between gap-3 mb-3 rounded px-4 py-2 shadow cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
            key={index}
          >
            <div>
              <h2 className="text-lg font-bold underline">{topic?.title}</h2>
              <h2 className="font-bold mt-2">{topic?.description}</h2>
            </div>
            <div className="flex justify-between items-center">
              <Link href={`/edit-topic/${topic?._id}`}>
                <Button variant="outline" size="icon" className="mr-2">
                  <Pencil className="w-4" />
                </Button>
              </Link>
              <RemoveBtn id={topic?._id} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicList;