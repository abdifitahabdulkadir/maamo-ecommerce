export function parseError(error: unknown, defaultMessage: string) {
  return error instanceof Error ? error.message : defaultMessage;
}
