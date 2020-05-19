import React from 'react'

import { Icon } from './Icon'

import { reactTesting } from '@/common/lib'

describe('Icon', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<Icon />)
  })
})
