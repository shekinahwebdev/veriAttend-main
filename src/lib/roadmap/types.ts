export type FeatureStatus = "PLANNED" | "IN_PROGRESS" | "TESTING" | "COMPLETED";
export type FeaturePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type BeneficiaryType =
  | "STUDENT"
  | "LECTURER"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "EVERYONE";
export type FeatureCategory =
  | "AI"
  | "MOBILE"
  | "ATTENDANCE"
  | "ANALYTICS"
  | "INTEGRATIONS"
  | "ADMIN"
  | "NOTIFICATIONS"
  | "OTHER";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  category: FeatureCategory;
  priority: FeaturePriority;
  beneficiary: BeneficiaryType;
  estimatedRelease: string | null;
  phase: string | null;
  estimatedDays: number | null;
  assignedDev: string | null;
  version: string | null;
  voteCount: number;
  commentCount: number;
  hasVoted?: boolean;
  createdAt: string;
}

export interface FeatureCommentItem {
  id: string;
  featureId: string;
  parentId: string | null;
  authorName: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
  createdAt: string;
  replies?: FeatureCommentItem[];
}

export interface RoadmapStats {
  featuresCompleted: number;
  featuresPlanned: number;
  featuresInProgress: number;
  communitySuggestions: number;
  totalVotes: number;
  institutionsUsing: number;
  studentsManaged: number;
  attendanceRecords: number;
}

export interface ReleaseVersion {
  version: string;
  title: string;
  features: string[];
}

export const STATUS_LABELS: Record<FeatureStatus, string> = {
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  TESTING: "Testing",
  COMPLETED: "Completed",
};

export const PRIORITY_LABELS: Record<FeaturePriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const CATEGORY_LABELS: Record<FeatureCategory, string> = {
  AI: "AI",
  MOBILE: "Mobile",
  ATTENDANCE: "Attendance",
  ANALYTICS: "Analytics",
  INTEGRATIONS: "Integrations",
  ADMIN: "Admin",
  NOTIFICATIONS: "Notifications",
  OTHER: "Other",
};

export const BENEFICIARY_LABELS: Record<BeneficiaryType, string> = {
  STUDENT: "Student",
  LECTURER: "Lecturer",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
  EVERYONE: "Everyone",
};

export const RELEASE_TIMELINE: ReleaseVersion[] = [
  {
    version: "1.0",
    title: "Foundation",
    features: ["Authentication", "OTP", "Attendance Sessions"],
  },
  {
    version: "1.5",
    title: "Operations",
    features: ["CSV Import", "Timetable", "Notifications"],
  },
  {
    version: "2.0",
    title: "Intelligence",
    features: ["AI Assistant", "Parent Portal", "Analytics AI"],
  },
  {
    version: "3.0",
    title: "Scale",
    features: ["Mobile App", "Offline Attendance", "Face Recognition"],
  },
];

export const ROADMAP_COLUMNS: FeatureStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "TESTING",
  "COMPLETED",
];

export const COLUMN_DESCRIPTIONS: Record<FeatureStatus, string> = {
  PLANNED: "Accepted but not started",
  IN_PROGRESS: "Currently under development",
  TESTING: "Being tested before release",
  COMPLETED: "Shipped and available",
};
