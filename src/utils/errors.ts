export function formatError(
  moduleName: string,
  statusCode: number,
  message: string
) {
  return `[${moduleName}] Error ${statusCode}: ${message}`;
}
