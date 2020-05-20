import { Button } from '../button/Button'
import { PageContainer } from '../container/PageContainer'
import { Section } from '../section/Section'
import { ChonkHeader } from '../section/ChonkHeader'

export const ChonkExamplesPage = () => {
  return (
    <PageContainer>
      <ChonkHeader>Examples!</ChonkHeader>

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
