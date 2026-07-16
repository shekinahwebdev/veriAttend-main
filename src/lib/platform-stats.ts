export interface PlatformStats {
  institutions: number;
  students: number;
  lecturers: number;
  sessions: number;
  records: number;
  verifications: number;
  uptime: number;
}

export const FALLBACK_PLATFORM_STATS: PlatformStats = {
  institutions: 12,
  students: 3420,
  lecturers: 86,
  sessions: 1240,
  records: 48000,
  verifications: 38500,
  uptime: 99.9,
};
