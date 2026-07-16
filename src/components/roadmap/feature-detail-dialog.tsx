"use client";

import { useEffect, useState } from "react";
import {
  ArrowBigUp,
  Bell,
  Check,
  Code2,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FeatureCommentItem, FeatureItem } from "@/lib/roadmap/types";
import {
  BENEFICIARY_LABELS,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/lib/roadmap/types";

function formatRelative(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface FeatureDetailDialogProps {
  feature: FeatureItem | null;
  onClose: () => void;
  onVote: (id: string) => void;
}

function CommentsPanel({ featureId }: { featureId: string }) {
  const [comments, setComments] = useState<FeatureCommentItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/features/${featureId}/comments`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setComments(data.comments ?? []);
          setLoaded(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [featureId]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/features/${featureId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, content: comment }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setComments((prev) => [
        {
          id: data.id,
          featureId,
          parentId: null,
          authorName: data.authorName,
          content: data.content,
          likes: 0,
          createdAt: data.createdAt,
          replies: [],
        },
        ...prev,
      ]);
      setComment("");
      toast.success("Comment posted");
    } catch {
      toast.error("Unable to post comment");
    }
  };

  return (
    <div>
      <h4 className="mb-4 font-semibold">Discussion</h4>

      <form onSubmit={handleComment} className="mb-6 space-y-3">
        <Input
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <Button type="submit" size="sm">
          <Send className="h-4 w-4" />
          Post Comment
        </Button>
      </form>

      {!loaded ? (
        <p className="text-sm text-muted-foreground">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {c.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{c.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelative(c.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FeatureDetailDialog({
  feature,
  onClose,
  onVote,
}: FeatureDetailDialogProps) {
  const [notifyEmail, setNotifyEmail] = useState("");

  if (!feature) return null;

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/features/${feature.id}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: notifyEmail }),
      });
      if (!res.ok) throw new Error("Failed");
      setNotifyEmail("");
      toast.success("You'll be notified when this feature ships!");
    } catch {
      toast.error("Unable to subscribe");
    }
  };

  return (
    <Dialog open={!!feature} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-8">
            <DialogTitle className="text-xl">{feature.title}</DialogTitle>
            <Badge variant="outline">{STATUS_LABELS[feature.status]}</Badge>
          </div>
        </DialogHeader>

        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{CATEGORY_LABELS[feature.category]}</Badge>
          <Badge>{PRIORITY_LABELS[feature.priority]}</Badge>
          <Badge variant="secondary">
            {BENEFICIARY_LABELS[feature.beneficiary]}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant={feature.hasVoted ? "default" : "outline"}
            onClick={() => onVote(feature.id)}
            className={feature.hasVoted ? "bg-success hover:bg-success/90" : ""}
          >
            {feature.hasVoted ? (
              <>
                <Check className="h-4 w-4" /> Voted
              </>
            ) : (
              <>
                <ArrowBigUp className="h-4 w-4" /> Vote ({feature.voteCount})
              </>
            )}
          </Button>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            {feature.commentCount} comments
          </span>
        </div>

        {(feature.phase || feature.assignedDev || feature.estimatedDays) && (
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Code2 className="h-4 w-4 text-primary" />
              Developer Notes
            </h4>
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              {feature.phase && (
                <div>
                  <span className="font-medium text-foreground">Phase</span>
                  <p>{feature.phase}</p>
                </div>
              )}
              {feature.estimatedDays && (
                <div>
                  <span className="font-medium text-foreground">Est. Dev Time</span>
                  <p>{feature.estimatedDays} days</p>
                </div>
              )}
              {feature.assignedDev && (
                <div>
                  <span className="font-medium text-foreground">Developer</span>
                  <p className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {feature.assignedDev}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {feature.status !== "COMPLETED" && (
          <form
            onSubmit={handleNotify}
            className="rounded-xl border border-primary/20 bg-primary/5 p-4"
          >
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Bell className="h-4 w-4 text-primary" />
              Notify me when this feature ships
            </h4>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </div>
          </form>
        )}

        <CommentsPanel key={feature.id} featureId={feature.id} />
      </DialogContent>
    </Dialog>
  );
}
