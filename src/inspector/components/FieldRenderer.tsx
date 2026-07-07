import { Card } from '@sanity/ui'
import { FunctionComponent } from 'react'
import {
  ArraySchemaType,
  BaseFormNode,
  FieldMember,
  isArray,
  Path,
  PortableTextBlock,
  SchemaType,
} from 'sanity'

import PortableTextRenderer from './PortableTextRenderer'
import { SectionRenderer } from './SectionRenderer'

interface FieldRendererProps {
  contentFieldMembers: FieldMember<BaseFormNode<unknown, SchemaType>>[]
  fieldNames: string[]
  handleOpen: (path: Path) => void
}
/** ## Field Renderer
 *
 * This component is responsible for rendering the fields defined in the plugin config in the inspector.
 *
 * It checks if the field is a Portable Text field or an array of objects and renders the appropriate component.
 * */
const FieldRenderer: FunctionComponent<FieldRendererProps> = (props) => {
  const { contentFieldMembers, fieldNames, handleOpen } = props
  return contentFieldMembers.map((member) => {
    const fieldPath = member.field.path
    const schemaType = member.field.schemaType
    const fieldValue = member.field.value as PortableTextBlock[] | { [key: string]: unknown }[]

    // * Only array and Portable Text fields are supported. A configured field
    // whose *schema type* isn't an array is a genuine misconfiguration, so
    // surface it. (An empty field is handled separately below — that's not an
    // error, just no entries yet.)
    if (schemaType.jsonType !== 'array') {
      console.error(
        `Table Of Content Plugin Error: Field "${member.name}" is not an array. The table of contents only supports array and Portable Text fields.`,
      )
      return (
        <Card tone={'caution'} key={member.key}>
          Error when resolving fields... Please check the console for more information.
        </Card>
      )
    }

    // * An array field with no value yet simply has no entries — render nothing
    // rather than logging an error on every render.
    if (!isArray(fieldValue) || fieldValue.length === 0) {
      return null
    }

    const fieldSchemaType = schemaType as ArraySchemaType

    // * Portable Text — schemaType.of contains a block type
    if (fieldSchemaType.of.some((type) => type.name === 'block')) {
      return (
        <PortableTextRenderer
          fieldPath={fieldPath}
          fieldSchemaType={fieldSchemaType}
          fieldValue={fieldValue as PortableTextBlock[]}
          handleOpen={handleOpen}
          key={member.key}
        />
      )
    }

    // * Array of Sections — schemaType.of contains object types
    return (
      <SectionRenderer
        fieldPath={fieldPath}
        fieldSchemaType={fieldSchemaType}
        fieldValue={fieldValue}
        fieldNames={fieldNames}
        handleOpen={handleOpen}
        key={member.key}
      />
    )
  })
}
export default FieldRenderer
