import AWS, { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import _ from 'lodash'
import { log } from '../log/log'

export type TData = 'string' | 'number' | 'binary' | 'boolean' //| 'date'
export const DataToDynamoDataMap = {
  string: 'S',
  number: 'N',
  binary: 'B',
  boolean: 'BOOL',
  //date: 'S',
}

export interface ITableMetadata {
  tableName: string
  hashKey: string
  rangeKey?: string
  data: {
    [key: string]: TData
  }
}

let _dynamoDb: DynamoDB // = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
let _docClient: DocumentClient // = new AWS.DynamoDB.DocumentClient()
export function getDynamo() {
  if (!_dynamoDb) {
    _dynamoDb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
    // _dynamoDb = new AWS.DynamoDB()
  }
  if (!_docClient) {
    _docClient = new AWS.DynamoDB.DocumentClient()
  }
  return { dynamoDb: _dynamoDb, docClient: _docClient }
}

export async function scan(
  tableMetadata: ITableMetadata,
  LastEvaluatedKey: any = undefined,
  ProjectionExpression: string | undefined = undefined,
) {
  const params = {
    TableName: tableMetadata.tableName,
    ExclusiveStartKey: LastEvaluatedKey,
    ProjectionExpression,
  }
  let { docClient } = getDynamo()
  return await docClient.scan(params).promise()
}

export async function get(
  tableMetadata: ITableMetadata,
  key: string,
  range?: string,
) {
  const params: any = {
    TableName: tableMetadata.tableName,
    Key: {
      [tableMetadata.hashKey]: key,
    },
  }
  if (tableMetadata.rangeKey) {
    params.Key[tableMetadata.rangeKey] = range
  }

  let { docClient } = getDynamo()
  let result = await docClient.get(params).promise()
  log('dynamo', 'get', tableMetadata.tableName, key, range, result)
  return result
}

export async function put(tableMetadata: ITableMetadata, item: any) {
  const params = {
    TableName: tableMetadata.tableName,
    Item: item,
  }
  let { docClient } = getDynamo()
  return await docClient.put(params).promise()
}

export async function putBulk(tableMetadata: ITableMetadata, items: any[]) {
  let putRequests = _.map(items, (c) => {
    let item: any = {}
    _.forOwn(c, (val, key) => {
      let metaType = tableMetadata.data[key]
      let dynamoType = DataToDynamoDataMap[metaType]
      // item[key] = {
      //   [dynamoType]: '' + val,
      // }
      item[key] = val
    })
    return { PutRequest: { Item: item } }
  })

  // log('dynamo', 'put bulk', () => JSON.stringify(putRequests, null, 2))

  let params: any = {
    // BatchWriteItemInput = {
    RequestItems: {
      [tableMetadata.tableName]: putRequests,
    },
  }

  // params = {
  //   RequestItems: {
  //     ZIPCODES: [
  //       {
  //         PutRequest: {
  //           Item: {
  //             ZIP: 'test1234', //{ S: 'test12345' },
  //           },
  //         },
  //       },
  //       // {
  //       //   PutRequest: {
  //       //     Item: {
  //       //       ZIP: { S: 'test12346' },
  //       //     },
  //       //   },
  //       // },
  //     ],
  //   },
  // } as any

  // log('dynamo', 'put bulk', () => JSON.stringify(params, null, 2))
  let { docClient } = getDynamo()
  return await docClient.batchWrite(params).promise()
}

export async function createTable(tableMetadata: ITableMetadata) {
  log('dynamo', 'create table', tableMetadata.tableName)

  let KeySchema = [
    {
      AttributeName: tableMetadata.hashKey,
      KeyType: 'HASH',
    },
  ]
  let AttributeDefinitions: any[] = [
    {
      AttributeName: tableMetadata.hashKey,
      AttributeType:
        DataToDynamoDataMap[tableMetadata.data[tableMetadata.hashKey]],
    },
  ]
  if (tableMetadata.rangeKey) {
    KeySchema.push({
      AttributeName: tableMetadata.rangeKey,
      KeyType: 'RANGE',
    })
    AttributeDefinitions.push({
      AttributeName: tableMetadata.rangeKey,
      AttributeType:
        DataToDynamoDataMap[tableMetadata.data[tableMetadata.rangeKey]],
    })
  }
  let { dynamoDb } = getDynamo()
  return await dynamoDb
    .createTable({
      TableName: tableMetadata.tableName,
      KeySchema,
      AttributeDefinitions,
      BillingMode: 'PAY_PER_REQUEST',
    })
    .promise()
}
