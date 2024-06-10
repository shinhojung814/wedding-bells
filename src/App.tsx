import classNames from 'classnames/bind'
import { useEffect } from 'react'
import styles from './App.module.scss'

const cx = classNames.bind(styles)

function App() {
  // 1. wedding 데이터 호출
  useEffect(() => {
    fetch('http://localhost:8888/wedding')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
      })
  }, [])

  return <div className={cx('container')}>App</div>
}

export default App
