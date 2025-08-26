/** ### Type Guard Function:
 * The `hasProperty` function checks if the given property exists on the given object.
 */
export const hasProperty = (
  object: Record<string, unknown>,
  property: string,
): object is { [key: string]: unknown } => {
  return property in object
}

/** ### Function to check object for keys:
 *
 * The `checkObjectForKeys` function checks if the given object has the given keys.
 *
 * @param object - The object to check for keys.
 * @param fieldNames - The keys to check for in the object.
 */
export const checkObjectForKeys = (
  object: { [key: string]: unknown },
  fieldNames: string[],
): string[] => Object.keys(object).filter((key) => fieldNames.includes(key))
