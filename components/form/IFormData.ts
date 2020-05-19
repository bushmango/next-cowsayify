import { IFormMetadataCollection } from './IFormMetadata'

export type FormUpdate<T> = (field: keyof T, newVal: any) => void

export interface IFormData<T> {
  form: T
  metadata: IFormMetadataCollection<T>
  onUpdateForm: FormUpdate<T>
  // tPrefix: string
}
