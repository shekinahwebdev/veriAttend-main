export function authorizeAdmin(request: Request): boolean {
  const adminKey = process.env.ROADMAP_ADMIN_KEY;
  const key = request.headers.get("x-admin-key");
  return Boolean(adminKey && key === adminKey);
}
