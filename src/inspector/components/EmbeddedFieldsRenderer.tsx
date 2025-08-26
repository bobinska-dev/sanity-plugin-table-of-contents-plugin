import { Box, Card, Text, Tooltip } from '@sanity/ui'
import { FunctionComponent } from 'react'
import { Path } from 'sanity'

import getTitle from '../../utils/getTitle'
import Pointer from './Pointer'

export interface EmbeddedFieldsRendererProps {
  arraySchemaTypeTitle: string
  fieldPath: Path
  fieldValue: { [key: string]: unknown }[]
  handleOpen: (path: Path) => void
}

const EmbeddedFieldsRenderer: FunctionComponent<EmbeddedFieldsRendererProps> = (props) => {
  const { fieldValue, fieldPath, arraySchemaTypeTitle, handleOpen } = props

  return fieldValue.map((item) => {
    // get title of the item
    const itemTitle = getTitle(item, arraySchemaTypeTitle)
    // item path
    const itemPath = fieldPath.concat([{ _key: item._key as string }, 'title'])
    return (
      <Card
        key={item._key as string}
        onClick={() => handleOpen(itemPath)}
        paddingLeft={5}
        paddingBottom={1}
        as="li"
      >
        {/*
         * * * TOOL TIP * * *
         */}
        <Tooltip
          content={
            <Box padding={2}>
              <Text size={1}>In: {arraySchemaTypeTitle}</Text>
            </Box>
          }
          placement="left"
          animate
          portal
          arrow
        >
          <Pointer gap={2} align={'flex-start'} justify={'flex-start'}>
            {/*
             * * * TITLE * * *
             */}
            <Text
              size={1}
              muted
              style={{
                fontStyle: 'italic',
              }}
            >
              {itemTitle}
            </Text>
            <Text id={'arrow'} size={1}>
              →
            </Text>
          </Pointer>
        </Tooltip>
      </Card>
    )
  })
}
export default EmbeddedFieldsRenderer
