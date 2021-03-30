import IconBtn from '@comps/IconBtn'
import { BtnL, ExternalL, L } from '@comps/L'
import styles from './styles.module.css'

export default function VisualGuide() {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <BtnL>Link</BtnL>
      </div>
      <div className={styles.cell}>
        <L href="">Normal Link</L>
      </div>
      <div className={styles.cell}>
        <ExternalL>External Link</ExternalL>
      </div>
      <div className={styles.cell}>
        <IconBtn>Icon Button</IconBtn>
      </div>
    </div>
  )
}
