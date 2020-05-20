import { Button } from '../button/Button'
import { PageContainer } from '../container/PageContainer'
import { Section } from '../section/Section'
import { ChonkHeader } from '../section/ChonkHeader'
import { Input } from '../input/Input'
import { Link } from '../link/Link'
import { FormItem } from '../form-item/FormItem'
import { Checkbox } from '../checkbox/Checkbox'
import { Select } from '../select/Select'
import React from 'react'
import { l } from '../../lodash/lodash'

export const ChonkExamplesPage = () => {
  const [state, setState] = React.useState({
    isPuppy: false,
    isFish: true,
  })
  const update = (changes: any) => {
    console.log('changes', changes)
    let merged = l.merge({}, state, changes)
    console.log('merged', merged)
    setState(l.merge({}, state, changes))
  }

  return (
    <PageContainer>
      <ChonkHeader>Examples!</ChonkHeader>

      <Section label='Buttons'>
        <Button>a button</Button>
        <Button round>a rounded button</Button>
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
        <Select />
      </Section>
      <Section label='Links'>
        <Link>Wikipedia</Link>
      </Section>

      <Section label='Forms'>
        <FormItem label='Name'>
          <Input />
        </FormItem>
        <FormItem label='Are you a cat?'>Yes / No</FormItem>
        <FormItem label='Interest level'>1 / 2 / 3 / 4 / 5</FormItem>
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
