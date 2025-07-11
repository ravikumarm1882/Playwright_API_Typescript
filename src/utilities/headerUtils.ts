export class HeaderUtils {
  /**
   * Get a header value by key (case-insensitive)
   */
  static getHeader<T = string>(headers: Record<string, string> | undefined, key: string): T | undefined {
    if (!headers) return undefined;
    const foundKey = Object.keys(headers).find(
      k => k.toLowerCase() === key.toLowerCase()
    );
    return foundKey ? (headers[foundKey] as unknown as T) : undefined;
  }

  /**
   * Get all header values matching a predicate
   */
  static filterHeaders(
    headers: Record<string, string> | undefined,
    predicate: (key: string, value: string) => boolean
  ): Record<string, string> {
    if (!headers) return {};
    return Object.fromEntries(
      Object.entries(headers).filter(([k, v]) => predicate(k, v))
    );
  }
}
