import React from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { PageContainer } from '../container/PageContainer'
import { FormItem } from '../form-item/FormItem'
import { Input } from '../input/Input'
import { Link } from '../link/Link'
import { ChonkHeader } from '../section/ChonkHeader'
import { Section } from '../section/Section'
import { ISelectOption, Select } from '../select/Select'
import { Banner } from '../banner/Banner'
import { Tooltip } from '../tooltip/Tooltip'
import { IMenuOption, Menu } from '../menu/Menu'

import { ITabOption, TabItems, Tabs } from '../tab/Tabs'

const options: ISelectOption[] = [
  {
    value: '1',
  },
  {
    value: '2',
    label: 'Two',
  },
  {
    value: '3',
  },
  {
    value: '4',
    renderer: (val) => {
      return <b>{val}!</b>
    },
  },
  {
    value: '5',
  },
]
const optionsAWords: ISelectOption[] = [
  {
    value: 'Apples',
  },
  {
    value: 'Aardvarks',
  },
  {
    value: 'Avocados',
  },
  {
    value: 'Apple Juice',
  },
  {
    value: 'Anchovies',
  },
]

const optionsMenu: IMenuOption[] = [
  {
    value: 'Apples',
  },
  {
    value: 'Aardvarks',
  },
  {
    value: 'Avocados',
  },
  {
    value: 'Apple Juice',
  },
  {
    value: 'Anchovies',
  },
]

const optionsTabs: ITabOption[] = [
  {
    value: 'Apples',
  },
  {
    value: 'Aardvarks',
  },
  {
    value: 'Avocados',
  },
]

const optionsLong: ISelectOption[] = []
for (let i = 0; i < 100; i++) {
  optionsLong.push({ value: 'Item ' + (i + 1) })
}

export const ChonkExamplesPage = () => {
  const [state, setState] = React.useState({
    isPuppy: false,
    isFish: true,
    name: 'Steve',
    interest: '2',
    aWord: 'Aardvark',
    favoriteNumber: '7',
  })
  const update = (changes: any) => {
    setState(Object.assign({}, state, changes))
  }

  return (
    <PageContainer>
      <ChonkHeader>Examples!</ChonkHeader>

      <Banner label='Controls' />
      <Section label='Buttons'>
        <Button>a button</Button>
        <Button round>a rounded button</Button>
      </Section>
      <Section label='Menu'>
        {/* <Menu2></Menu2> */}

        <Menu options={optionsMenu}>Fruits</Menu>
      </Section>

      <Section label='Tabs'>
        <Tabs options={optionsTabs}>content?</Tabs>
      </Section>

      <Section label='Inputs'>
        <Input />
        <Input />
      </Section>
      <Section label='Checkboxes'>
        <Checkbox
          checked={state.isPuppy}
          onChange={(newVal) => {
            update({ isPuppy: newVal })
          }}
        >
          Are you a puppy?
        </Checkbox>
        <Checkbox
          checked={state.isFish}
          onChange={(newVal) => {
            update({ isFish: newVal })
          }}
        >
          Are you a fish?
        </Checkbox>
      </Section>
      <Section label='Selects'>
        <Select
          value={state.interest}
          options={options}
          onChange={(newVal) => {
            update({ interest: newVal })
          }}
        />
        <Select
          allowText={true}
          value={state.interest}
          options={options}
          onChange={(newVal) => {
            update({ interest: newVal })
          }}
        />
        <Select
          allowText={true}
          value={state.aWord}
          options={optionsAWords}
          onChange={(newVal) => {
            update({ aWord: newVal })
          }}
        />
        <Select
          allowText={true}
          value={state.favoriteNumber}
          options={optionsLong}
          onChange={(newVal) => {
            update({ favoriteNumber: newVal })
          }}
        />
      </Section>
      <Section label='Links'>
        <Link>Wikipedia</Link>
      </Section>
      <Section label='Tooltips'>
        <div>
          <Tooltip position='top' content={() => <div>Content 1!</div>}>
            Mouse over me!
          </Tooltip>
        </div>
        <div>
          <Tooltip position='bottom' content={() => <div>Content 2!</div>}>
            And me!
          </Tooltip>
        </div>
      </Section>
      <Banner label='Forms' />
      <Section label='Forms'>
        <FormItem label='Name'>
          <Input
            value={state.name}
            onChange={(newVal) => {
              update({ name: newVal })
            }}
          />
        </FormItem>
        <div>Hello {state.name || 'Anonymous'}</div>
        <FormItem label='Are you a puppy?'>
          <Checkbox
            checked={state.isPuppy}
            onChange={(newVal) => {
              update({ isPuppy: newVal })
            }}
          >
            Are you a puppy?
          </Checkbox>
        </FormItem>
        <FormItem label='Interest level'>
          <Select
            value={state.interest}
            options={options}
            onChange={(newVal) => {
              update({ interest: newVal })
            }}
          />
        </FormItem>
      </Section>
      <Section label='About' inverted={true}>
        About CHONK style
      </Section>
      <Section label='Mobile-Friendly'>
        Mobile first, by default, with no tricks
      </Section>
      <Section label='Another section'>
        <Button>a button</Button>
        <Button round>a rounded button</Button>
      </Section>
    </PageContainer>
  )
}
