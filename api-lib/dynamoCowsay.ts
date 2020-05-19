import { ITableMetadata } from '../common/dynamo/dynamo'

const slugify = require('slugify')

export function titleToPublishHk(title: string) {
  return slugify(title.trim() || 'bad')
}

export const razCowsay: ITableMetadata = {
  tableName: 'cowsay',
  hashKey: 'hk',
  data: {
    hk: 'string',
    options: 'string',
    text: 'string',
    createdDateTime: 'string',
  },
}

export interface IDynamoCowsay {
  hk: string
  options: string
  text: string
  createdDateTime: string
}
