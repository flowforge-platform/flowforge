export interface UserBadge {
  label: string;
  variant: "default" | "secondary" | "outline";
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;

  role: string;
  organization: string;
  memberSince: string;

  badges: UserBadge[];
}

export interface SecurityInfo {
  lastLogin: string;
  location: string;
}

export interface ProfileStat {
  id: string;
  label: string;
  value: string;
  icon: "workflow" | "execution" | "approval" | "template";
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type:
    | "workflow"
    | "execution"
    | "approval"
    | "profile";
}

export interface Profile {
  user: UserProfile;

  security: SecurityInfo;

  stats: ProfileStat[];

  activities: Activity[];
}