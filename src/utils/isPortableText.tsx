import { isRecord, PortableTextObject, PortableTextSpan, PortableTextTextBlock } from 'sanity'

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
