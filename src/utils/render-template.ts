export const renderTemplate = (
  content: string,
  values: Record<string, string>,
) =>
  content.replace(
    /\{\{(\w+)\}\}/g,
    (match, key: string) => values[key] ?? match,
  )
