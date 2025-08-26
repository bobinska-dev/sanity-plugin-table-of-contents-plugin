import { toPlainText } from '@portabletext/toolkit'
import { isArray, isPortableTextTextBlock } from 'sanity'

import { isPortableTextNew } from './isPortableText'

/** Extracts a title from a block, prioritizing `title`, then `description`, then `body` fields.
 *
 * @param block - The block/section from which to extract the title.
 * @param customBlockTitle - The custom title of the block type.
 * @returns The extracted title or null if no suitable field is found.
 */
export default function getTitle(
  block: unknown,
  customBlockTitle: string | undefined,
): string | null {
  if (!block && !customBlockTitle) return null

  // Default title if no custom title is provided
  const blockTitle = customBlockTitle || 'Section'
  // check if block is a PortableText text block
  if (isPortableTextTextBlock(block)) {
    return toPlainText(block)
  }
  if (typeof block === 'object') {
    const customBlock = block as Record<string, unknown>
    // find title, description or body field
    const titleField = customBlock?.title
    const descriptionField = customBlock?.description || customBlock?.subtitle
    const bodyField = customBlock?.body

    // for all custom blocks that have no such thing as a title etc. > return the block title
    if (!titleField && !descriptionField && !bodyField) {
      return `(custom) ${blockTitle}`
    }
    if (titleField && isArray(titleField) && isPortableTextNew(titleField)) {
      return toPlainText(titleField)
    }
    if (titleField && typeof titleField === 'string' && titleField.trim().length > 0) {
      return titleField
    }

    if (
      descriptionField &&
      typeof descriptionField === 'string' &&
      descriptionField.trim().length > 0
    ) {
      return `${blockTitle} - ${descriptionField.substring(0, 60)} ...`
    }
    if (descriptionField && isArray(descriptionField) && isPortableTextNew(descriptionField)) {
      const description = toPlainText(descriptionField)
      return `${blockTitle} - ${description.substring(0, 60)}...`
    }

    if (bodyField && typeof bodyField === 'string' && bodyField.trim().length > 0) {
      return `${blockTitle} - ${bodyField.substring(0, 60)} ...`
    }
    if (bodyField && isArray(bodyField) && isPortableTextNew(bodyField)) {
      const body = toPlainText(bodyField)
      return `${blockTitle} - ${body.substring(0, 60)}...`
    }
  }
  console.error(
    `Table Of Content Plugin Error: Could not extract title from block of type "${customBlockTitle}". Please make sure the block has a "title", "description" or "body" field.`,
  )
  return null
}
