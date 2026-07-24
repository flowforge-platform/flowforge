import ProfileView from "@/components/profile/ProfileView";
import { getProfile } from "@/lib/api/profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return <ProfileView profile={profile} />;
}