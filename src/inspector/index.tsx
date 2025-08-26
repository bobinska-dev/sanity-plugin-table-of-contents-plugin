import { UlistIcon } from '@sanity/icons'
import {
  defineDocumentInspector,
  DocumentInspector,
  DocumentInspectorMenuItem,
  useTranslation,
} from 'sanity'

import { TableOfContentsPluginOptions } from '../tableOfContentsPlugin'
import TableOfContentsInspector from './components/TableOfContentsInspector'

function useMenuItem(): DocumentInspectorMenuItem {
  const { t } = useTranslation('table-of-contents')
  return {
    icon: UlistIcon,
    showAsAction: true,
    title: t('table-of-contents-plugin.title'),
  }
}

export const tableOfContentsInspector = (props: TableOfContentsPluginOptions): DocumentInspector =>
  defineDocumentInspector({
    name: 'tableOfContents',
    component: (inspectorProps) => <TableOfContentsInspector {...inspectorProps} config={props} />,
    useMenuItem,
  })
