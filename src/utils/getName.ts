export function getLastName(text: string): string {
  return text.trim().split(" ").pop() ?? "";
}