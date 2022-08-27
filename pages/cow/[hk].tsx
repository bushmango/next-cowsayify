import { GetServerSideProps } from 'next'
import {
  Cowsaid_Hk,
  Cowsaid_Hk_getServerSideProps,
} from '../../components/cowsayify/Cowsaid_Hk'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return Cowsaid_Hk_getServerSideProps(context)
}

export default Cowsaid_Hk
