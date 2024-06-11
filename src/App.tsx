import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './App.module.scss'
import FullScreenMessage from '@shared/FullScreenMessage'
import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'

import { Wedding } from '@models/wedding'
import Gallery from './components/sections/Gallery'

const cx = classNames.bind(styles)

function App() {
  const [weddingData, setWeddingData] = useState<Wedding | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  // 1. wedding 데이터 호출
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return response.json()
      })
      .then((data) => {
        setWeddingData(data)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      })
      .catch((e) => {
        console.log('에러 발생', e)
        setIsError(true)
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      })
  }, [])

  if (isLoading) {
    return <FullScreenMessage type="loading" />
  }

  if (isError) {
    return <FullScreenMessage type="error" />
  }

  if (weddingData == null) {
    return null
  }

  const { date, galleryImages } = weddingData

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Gallery images={galleryImages} />
      {JSON.stringify(weddingData)}
    </div>
  )
}

export default App
