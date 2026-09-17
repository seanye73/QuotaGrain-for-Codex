// Native image and anchor URLs need the repository prefix on project Pages.
// next/link handles its own prefix and must not be passed through this helper.
export function sitePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? ''}${path}`;
}
