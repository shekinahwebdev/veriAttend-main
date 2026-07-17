"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Download,
  KeyRound,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type CommunityMember = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  githubUrl: string | null;
  linkedInUrl: string | null;
  message: string | null;
  createdAt: string;
};

const ROLE_LABELS: Record<string, string> = {
  DEVELOPER: "Developer",
  DESIGNER: "Designer",
  STUDENT: "Student",
  LECTURER: "Lecturer",
  TESTER: "Tester",
  OTHER: "Other",
};

const ADMIN_KEY_STORAGE = "veriattend-admin-key";

export function CommunityAdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [inputKey, setInputKey] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "";
  });
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [stats, setStats] = useState({ total: 0, recentSignups: 0 });
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchMembers = useCallback(
    async (key = adminKey, role = roleFilter, query = search) => {
      if (!key) return;

      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (role !== "all") params.set("role", role);
      if (query.trim()) params.set("search", query.trim());

      try {
        const res = await fetch(`/api/admin/community?${params.toString()}`, {
          headers: { "x-admin-key": key },
        });

        if (res.status === 401) {
          sessionStorage.removeItem(ADMIN_KEY_STORAGE);
          setAdminKey("");
          setError("Invalid admin key.");
          return;
        }

        if (!res.ok) throw new Error("Failed to load members");

        const data = await res.json();
        setMembers(data.members);
        setStats(data.stats);
      } catch {
        setError("Unable to load community members.");
      } finally {
        setLoading(false);
      }
    },
    [adminKey, roleFilter, search]
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(ADMIN_KEY_STORAGE, inputKey);
    setAdminKey(inputKey);
    void fetchMembers(inputKey, roleFilter, search);
  };

  const handleExport = async () => {
    const params = new URLSearchParams({ format: "csv" });
    if (roleFilter !== "all") params.set("role", roleFilter);
    if (search.trim()) params.set("search", search.trim());

    const res = await fetch(`/api/admin/community?${params.toString()}`, {
      headers: { "x-admin-key": adminKey },
    });

    if (!res.ok) return;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `veriattend-community-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const recentMembers = useMemo(
    () => members.slice(0, 5),
    [members]
  );

  if (!adminKey) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Community Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your admin key to view community signups.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Admin key"
              required
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Admin</h1>
          <p className="mt-2 text-muted-foreground">
            Manage interest signups for the VeriAttend community.
          </p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Total Community Members</p>
          </div>
          <div className="mt-3 text-3xl font-bold tabular-nums">
            {loading ? <Skeleton className="h-9 w-16" /> : stats.total}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <UserPlus className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Recent Signups (30 days)</p>
          </div>
          <div className="mt-3 text-3xl font-bold tabular-nums">
            {loading ? <Skeleton className="h-9 w-16" /> : stats.recentSignups}
          </div>
        </div>
      </div>

      {recentMembers.length > 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Recent Signups</h2>
          <div className="mt-4 space-y-3">
            {recentMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{member.fullName}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
                <Badge variant="secondary">
                  {ROLE_LABELS[member.role] ?? member.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => void fetchMembers()}>
          Apply Filters
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">GitHub</th>
                <th className="px-4 py-3 text-left font-medium">LinkedIn</th>
                <th className="px-4 py-3 text-left font-medium">Message</th>
                <th className="px-4 py-3 text-left font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={7} className="px-4 py-4">
                        <Skeleton className="h-6 w-full" />
                      </td>
                    </tr>
                  ))
                : members.map((member) => (
                    <tr key={member.id} className="align-top">
                      <td className="px-4 py-3 font-medium">{member.fullName}</td>
                      <td className="px-4 py-3">{member.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">
                          {ROLE_LABELS[member.role] ?? member.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {member.githubUrl ? (
                          <a
                            href={member.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Profile
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {member.linkedInUrl ? (
                          <a
                            href={member.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Profile
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="max-w-xs px-4 py-3 text-muted-foreground">
                        {member.message || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {!loading && members.length === 0 && (
          <p className="px-4 py-8 text-center text-muted-foreground">
            No community members found.
          </p>
        )}
      </div>
    </div>
  );
}
