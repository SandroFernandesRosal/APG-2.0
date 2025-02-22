'use client'

import { useTheme } from 'next-themes'
import ReactSwitch from 'react-switch'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme()

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ReactSwitch
      className="flex items-center justify-center"
      onChange={changeTheme}
      checked={theme === 'light'}
      checkedIcon={
        <BsFillMoonFill color="#c96dfd" fontSize="26" className="p-[3px]" />
      }
      uncheckedIcon={
        <BsFillSunFill color="yellow" fontSize="26" className="p-[3px]" />
      }
      onColor={'#0e0e0e'}
      offColor={'#4F4F4F'}
      onHandleColor={'#fff'}
      offHandleColor={'#fff'}
      activeBoxShadow={'0 0 1px 2px #70a1e0'}
    />
  )
}
