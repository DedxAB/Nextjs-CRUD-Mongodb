import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";
import { fetchUserById } from "@/services/userServices";
import { getServerSession } from "next-auth";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  return {
    title: `${user?.name || "Profile"}`,
  };
};

const Profile = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  const session = await getServerSession();

  const isCurrentUserPrifile = session?.user?.email === user?.email;
  const filteredNotes = user?.notes.filter((note) => {
    return isCurrentUserPrifile || note?.visibility === "public";
  });

  return (
    <div className="min-h-[85vh]">
      <ProfileSection user={user} />
      <hr className="my-6" />
      <UserFeed notes={filteredNotes} user={user} />
    </div>
  );
};

export default Profile;
