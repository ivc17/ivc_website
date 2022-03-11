import { ReactComponent as Logo } from 'assets/svg/logo.svg'
import Frame from 'components/Frame'

export default function Home() {
  return (
    <div>
      <Logo style={{ width: '100px', height: '100px' }} />
      <Frame />
    </div>
  )
}
