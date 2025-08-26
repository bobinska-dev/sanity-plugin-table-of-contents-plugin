import { isRecord, PortableTextObject, PortableTextSpan, PortableTextTextBlock } from 'sanity'

/** ### Function ´isPortableText´
 *
 * Check if an array of objects is a valid Portable Text array.
 *
 * @param array
 * @returns true if all objects in the array are Portable Text blocks, false otherwise
 */
export const isPortableText = (array: any[]): boolean => {
  if (array === undefined || array === null) {
    return false
  }
  return array.some((item) => {
    return item._type === 'block'
  })
}

/**
 * Assert that a given portable-text text-block type object
 *
 * @remarks
 * * The `markDefs` and `style` property of a block is optional.
 * * Block types can be named, so expect anything of the _type property.
 *
 */
export function isPortableTextNew<T = PortableTextSpan | PortableTextObject>(
  value: unknown[],
): value is PortableTextTextBlock<T>[] {
  return value.some((block) => {
    return (
      isRecord(block) &&
      typeof block._type === 'string' && // block types can be named, so expect anything here.
      Array.isArray(block.children) &&
      block.children.every((child) => isRecord(child)) &&
      ('markDefs' in block // optional property
        ? Array.isArray(block.markDefs) && block.markDefs.every((def) => isRecord(def))
        : true) &&
      ('style' in block ? typeof block.style === 'string' : true) // optional property
    )
  })
}
