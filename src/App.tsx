import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './App.module.scss'
import FullScreenMessage from '@components/shared/FullScreenMessage'

const cx = classNames.bind(styles)

function App() {
  const [weddingData, setWeddingData] = useState(null)
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
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('에러 발생', e)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading === false) {
    return <FullScreenMessage type="loading" />
  }

  if (isError) {
    return <FullScreenMessage type="error" />
  }

  return <div className={cx('container')}>{JSON.stringify(weddingData)}</div>
}

export default App
