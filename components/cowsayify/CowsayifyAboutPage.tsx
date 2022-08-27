import React from 'react'
import { H1 } from '../form2/typography/Headers'
import css from './CowsayifyAboutPage.module.scss'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'

const keywords = [
  'serverless-api',
  'serverless-frontent',
  'full-stack-serverless',
  'next.js',
  'react',
  'dynamodb',
  'aws',
  'lambda',
  'typescript',
  'server-side-rendering',
  'sass',
  'tailwindcss',
  'jotai',
  'state-management',
  'responsive-design',
]

function Section(props: any) {
  return <div className={css.section}>{props.children}</div>
}

export function CowsayifyAboutPage(props: {}) {
  return (
    <CowsayifyLayout>
      <CowsayifyAbout />
    </CowsayifyLayout>
  )
}

export const CowsayifyAbout = () => {
  return (
    <div>
      <H1>About cowsayify</H1>
      <Section>
        Originally made by Tony Monroe, cowsay is an iconic lunux command to
        send messages
      </Section>
      <Section>
        <a href='https://en.wikipedia.org/wiki/Cowsay'>Wikipedia: Cowsay</a>
      </Section>
      <Section>Converted for the web by Steve Bushman</Section>
      <Section>
        Demonstrates these technologies:
        <br />
        {keywords.map((c) => (
          <div key={c} className={css.keyword}>
            {c}
          </div>
        ))}
      </Section>
      <Section>
        Source available on github!
        <br />
        <a href='https://github.com/bushmango/next-cowsayify'>
          https://github.com/bushmango/next-cowsayify
        </a>
      </Section>

      <Section>
        More good stuff at <br />
        <a href='https://stevebushman.com'>https://stevebushman.com</a>
      </Section>

      <DisplayCow
        options={{
          text: 'Copyright 2018-2022 Steve Bushman\nMIT License\nhttps://github.com/bushmango/next-cowsayify',
          action: 'say',
        }}
      />
    </div>
  )
}
