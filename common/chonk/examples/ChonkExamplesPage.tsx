import { Button } from '../button/Button'
import { PageContainer } from '../container/PageContainer'
import { Section } from '../section/Section'

export const ChonkExamplesPage = () => {
  return (
    <PageContainer>
      Examples!
      <Section label='Buttons'>
        <Button>a button</Button>
        <Button round>a rounded button</Button>
      </Section>
      <Section label='Another section'>
        <Button>a button</Button>
        <Button round>a rounded button</Button>
      </Section>
    </PageContainer>
  )
}
