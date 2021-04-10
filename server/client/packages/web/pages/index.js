import { getWelcomeString } from '@pgcomm/shared'
export default () => {
  return <h1>{getWelcomeString('Paul')}</h1>
}