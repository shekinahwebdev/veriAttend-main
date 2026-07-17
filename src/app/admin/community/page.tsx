import type { Metadata } from "next";
import { CommunityAdminDashboard } from "@/components/admin/community-dashboard";

export const metadata: Metadata = {
  title: "Community Admin — VeriAttend",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function CommunityAdminPage() {
  return <CommunityAdminDashboard />;
}
