import classNames from 'classnames/bind'
import styles from './Gallery.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(styles)

function Gallery({ images }: { images: string[] }) {
  return (
    <Section title="사진첩">
      <ul className={cx('wrap-images')}>
        {images.map((src, index) => (
          <li key={index} className={cx('wrap-image')}>
            <img src={src} className={cx('image')} alt="사진첩 이미지" />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Gallery
