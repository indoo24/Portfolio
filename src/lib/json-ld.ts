/**
 * Serializes structured data for a <script type="application/ld+json"> tag,
 * escaping "<" so content cannot close the script element.
 */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
