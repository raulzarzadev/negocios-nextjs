import Advert from '@comps/Advert'
import IconBtn from '@comps/IconBtn'
import { BtnL, ExternalL, L } from '@comps/L'
import PrimBtn from '@comps/PrimBtn'
import styles from './styles.module.css'

export default function VisualGuide () {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <BtnL>Link</BtnL>
      </div>
      <div className={styles.cell}>
        <L href="#">App Link</L>
      </div>
      <div className={styles.cell}>
        <ExternalL href="#">External Link</ExternalL>
      </div>
      <div className={styles.cell}>
        <IconBtn>Icon Button</IconBtn>
      </div>
      <div className={styles.cell}>
        <PrimBtn color="primary">Primary</PrimBtn>
      </div>
      <div className={styles.cell}>
        <PrimBtn color="secondary">Secondary</PrimBtn>
      </div>
      <div className={styles.cell}>
        <PrimBtn color="danger">Danger</PrimBtn>
      </div>
      <div className={styles.cell}>
        <PrimBtn color="warning">Warning</PrimBtn>
      </div>
      <div className={styles.cell}>
        <PrimBtn color="success">Success</PrimBtn>
      </div>

      <div className={styles.cell}>
        <Advert />
      </div>

    </div>
  )
}
