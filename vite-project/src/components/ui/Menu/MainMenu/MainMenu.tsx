import { FC, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import {
  createOpenChangeHandler,
  getLevelKeys,
  LevelKeysProps,
} from '../../utils/utilsMenu'

type MenuItem = Required<MenuProps>['items'][number]
interface Props {
  items: MenuItem[]
  defaultOpenKeys?: string[]
}

const MainMenu: FC<Props> = ({ items, defaultOpenKeys = [] }) => {
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys)
  const levelKeys = getLevelKeys(items as LevelKeysProps[])
  const onOpenChange = createOpenChangeHandler(levelKeys, setOpenKeys)

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      items={items}
      onOpenChange={onOpenChange}
    />
  )
}

export default MainMenu
