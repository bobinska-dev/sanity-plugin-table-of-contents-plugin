import { Card, Text } from '@sanity/ui'
import { FunctionComponent } from 'react'
import {
  ArraySchemaType,
  isPortableTextTextBlock,
  Path,
  PortableTextBlock,
  PortableTextTextBlock,
} from 'sanity'

import { capitaliseFirstLetter } from '../../utils/capitaliseFirstLetter'
import { getNestedIndentation } from '../../utils/getIndentation'
import getTitle from '../../utils/getTitle'
import Pointer from './Pointer'

interface PortableTextRendererProps {
  fieldValue: PortableTextBlock[]
  fieldSchemaType: ArraySchemaType<unknown>
  fieldPath: Path
  handleOpen: (path: Path) => void
}
const PortableTextRenderer: FunctionComponent<PortableTextRendererProps> = (props) => {
  const { fieldValue, fieldSchemaType, fieldPath, handleOpen } = props
  return fieldValue
    .filter(
      (block) =>
        (block._type === 'block' && (block as PortableTextTextBlock).style?.startsWith('h')) ||
        block._type !== 'block',
    )
    .map((block: PortableTextBlock) => {
      // * Preparation
      const indentation = getNestedIndentation(block, fieldValue as PortableTextBlock[])
      const blockPath = fieldPath.concat([{ _key: block._key }])

      const blockType = fieldSchemaType.of.find((ofType) => ofType.name === block._type)
      const customBlockTitle = blockType?.title

      const title = getTitle(block, customBlockTitle)

      return (
        <Card
          onClick={() => handleOpen(blockPath)}
          marginLeft={indentation}
          paddingLeft={2}
          paddingBottom={1}
          as="li"
          key={block._key}
        >
          <Pointer gap={2} align={'center'} justify={'flex-start'}>
            {/*
             * * * * * H INDICATOR * * * * *
             */}
            {isPortableTextTextBlock(block) && block.style && (
              <Text size={0} muted>
                {capitaliseFirstLetter(block.style as string)}:
              </Text>
            )}
            {/*
             * * * * * TITLE * * * * *
             */}
            <Text
              size={1}
              muted={Boolean(!block.style)}
              style={{
                fontStyle: block.style ? 'inherit' : 'italic',
              }}
            >
              {title}
            </Text>
            <Text id={'arrow'} size={1}>
              →
            </Text>
          </Pointer>
        </Card>
      )
    })
}
export default PortableTextRenderer
