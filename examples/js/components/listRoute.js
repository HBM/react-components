import React from 'react'
import Playground from 'component-playground'
import { List, Row, Icon } from '../../../'

const longText = 'This is sometimes a very lengthy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ita graviter et severe voluptatem secrevit a bono. Aliter homines, aliter philosophos loqui putas oportere? Nunc haec primum fortasse audientis servire debemus'

const singleLineItem =
`<List>
  <Row primary='Apple' />
  <Row primary='Banana' />
  <Row primary='Strawberry' />
</List>`

const singleLineItemWithIcon =
`<List>
  <Row primary='Apple' icon={<Icon.Assessment />} />
  <Row primary='Banana' icon={<Icon.Assessment />} />
  <Row primary='Strawberry' icon={<Icon.Assessment />} />
</List>`

const singleLineItemWithAvatar =
`<List>
  <Row primary='Apple' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
  <Row primary='Banana' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
  <Row primary='Strawberry' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
</List>`

const singleLineItemWithAvatarAndIcon =
`<List>
  <Row primary='Apple' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' icon={<Icon.Assessment />} />
  <Row primary='Banana' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' icon={<Icon.Assessment />} />
  <Row primary='Strawberry' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' icon={<Icon.Assessment />} />
</List>`

const twoLineItem =
`<List>
  <Row primary='Apple' secondary='From Belgium' />
  <Row primary='Banana' secondary='From Sweden' />
  <Row primary='Strawberry' secondary={'From Germany. ' + longText} />
</List>`

const twoLineItemWithIcon =
`<List>
  <Row primary='Apple' icon={<Icon.Assessment />} secondary='Really fresh' />
  <Row primary='Banana' icon={<Icon.Assessment />} secondary='Really fresh' />
  <Row primary='Strawberry' icon={<Icon.Assessment />} secondary='Really fresh' />
</List>`

const twoLineItemWithAvatar =
`<List>
  <Row primary='Apple' secondary='Really fresh' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
  <Row primary='Banana' secondary='Really fresh' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
  <Row primary='Strawberry' secondary='Really fresh' avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
</List>`

const twoLineItemWithAvatarAndIcon =
`<List>
  <Row
    primary='Apple'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460'
    icon={<Icon.Assessment />} />
  <Row
    primary='Banana'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460'
    icon={<Icon.Assessment />} />
  <Row
    primary='Strawberry'
    secondary={'Really fresh ' + longText}
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460'
    icon={<Icon.Assessment />} />
</List>`

const threeLineSubheaderItem =
`<List>
  <Row primary='Apple' subheader='Try new fruits' secondary='From Belgium' />
  <Row primary='Banana' subheader='Try new fruits' secondary='From Sweden' />
  <Row primary='Strawberry' subheader='Try new fruits' secondary='From Germany' />
</List>`

const threeLineSubheaderItemWithIcon =
`<List>
  <Row
    primary='Apple'
    subheader='Try new fruits'
    icon={<Icon.Assessment />}
    secondary='Really fresh' />
  <Row
    primary='Banana'
    subheader='Try new fruits'
    icon={<Icon.Assessment />}
    secondary='Really fresh' />
  <Row
    primary='Strawberry'
    subheader='Try new fruits'
    icon={<Icon.Assessment />}
    secondary='Really fresh' />
</List>`

const threeLineSubheaderItemWithAvatar =
`<List>
  <Row
    primary='Apple'
    subheader='Try new fruits'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
  <Row
    primary='Banana'
    subheader='Try new fruits'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
  <Row
    primary='Strawberry'
    subheader='Try new fruits'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460' />
</List>`

const threeLineSubheaderItemWithAvatarAndIcon =
`<List>
  <Row
    primary='Apple'
    subheader='Try new fruits'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460'
    icon={<Icon.Assessment />} />
  <Row
    primary='Banana'
    subheader='Try new fruits'
    secondary='Really fresh'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460'
    icon={<Icon.Assessment />} />
  <Row
    primary='Strawberry'
    secondary='Really fresh'
    subheader='Try new fruits'
    avatar='https://avatars3.githubusercontent.com/u/445883?v=3&s=460'
    icon={<Icon.Assessment />} />
</List>`

const customStyle =
`<List style={{backgroundColor: 'cyan'}}>
  <Row primary='Apple' />
  <Row primary='Banana' />
  <Row primary='Strawberry' />
</List>`

const selectableOnFocusOrOnBlurDefinedOnRow =
`<List>
  <Row primary='Apple' onFocus={() => {}} />
  <Row primary='Banana' onFocus={() => {}} />
  <Row primary='Strawberry' onFocus={() => {}} />
</List>`

export default class ListRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Single-line item</h2>
          <Playground
            codeText={singleLineItem}
            scope={{React, List, Row}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Single-line item with icon</h2>
          <Playground
            codeText={singleLineItemWithIcon}
            scope={{React, List, Row, Icon}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Single-line item with avatar</h2>
          <Playground
            codeText={singleLineItemWithAvatar}
            scope={{React, List, Row}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Single-line item with avatar and icon</h2>
          <Playground
            codeText={singleLineItemWithAvatarAndIcon}
            scope={{React, List, Row, Icon}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Two-line item</h2>
          <Playground
            codeText={twoLineItem}
            scope={{React, List, Row, longText}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Two-line item with icon</h2>
          <Playground
            codeText={twoLineItemWithIcon}
            scope={{React, List, Row, Icon}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Two-line item with avatar</h2>
          <Playground
            codeText={twoLineItemWithAvatar}
            scope={{React, List, Row}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Two-line item with avatar and icon</h2>
          <Playground
            codeText={twoLineItemWithAvatarAndIcon}
            scope={{React, List, Row, Icon, longText}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Three-line (subheader) item</h2>
          <Playground
            codeText={threeLineSubheaderItem}
            scope={{React, List, Row}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Three-line (subheader) item with icon</h2>
          <Playground
            codeText={threeLineSubheaderItemWithIcon}
            scope={{React, List, Row, Icon}}
            collapsableCode
          />

        </section>
        <section>
          <h2>Three-line (subheader) item with avatar</h2>
          <Playground
            codeText={threeLineSubheaderItemWithAvatar}
            scope={{React, List, Row}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Three-line (subheader) item with avatar and icon</h2>
          <Playground
            codeText={threeLineSubheaderItemWithAvatarAndIcon}
            scope={{React, List, Row, Icon}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Custom style</h2>
          <Playground
            codeText={customStyle}
            scope={{React, List, Row}}
            collapsableCode
          />

        </section>
        <section>
          <h2>Selectable (onFocus or onBlur defined on Row)</h2>
          <Playground
            codeText={selectableOnFocusOrOnBlurDefinedOnRow}
            scope={{React, List, Row}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/lists.html'>
            https://material.google.com/components/lists.html
          </a>
        </section>
      </div>
    )
  }

}
