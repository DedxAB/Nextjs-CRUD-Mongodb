import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchUserById } from "@/services/userServices";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Profile",
};

const ProfileEditPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  // console.log(id);

  const { user } = await fetchUserById(id);

  const { bio, socialLinks, _id: userId } = user;
  // console.log(bio);

  if (session?.user?.email === user?.email) {
    return (
      <div className="min-h-[85vh]">
        <div className="mt-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href={`${BASE_URL}`}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`${BASE_URL}/profile/${id}/details`}>Profile</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Edit</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <EditProfileForm userId={userId} bio={bio} socialLinks={socialLinks} />
      </div>
    );
  } else {
    redirect("/");
  }
};

export default ProfileEditPage;
