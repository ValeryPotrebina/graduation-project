import { FC, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import styles from './MainMenu.module.css'
import {
  createOpenChangeHandler,
  getLevelKeys,
  LevelKeysProps,
} from '../../utils/utilsMenu'
import { Resizable } from 're-resizable'

type MenuItem = Required<MenuProps>['items'][number]
interface Props {
  items: MenuItem[]
  defaultOpenKeys?: string[]
  className?: string
}

const MainMenu: FC<Props> = ({ items, defaultOpenKeys = [] }) => {
  // исправить
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys)
  const levelKeys = getLevelKeys(items as LevelKeysProps[])
  const onOpenChange = createOpenChangeHandler(levelKeys, setOpenKeys)
  return (
    <Menu
      className={styles.menu}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  )
}

export default MainMenu
