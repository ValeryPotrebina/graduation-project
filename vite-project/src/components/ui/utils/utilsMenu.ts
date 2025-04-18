// menuUtils.ts
import { MenuProps } from 'antd'

// TODO убрать фигни с автозакрыванием (не работает)
export interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}

export const getLevelKeys = (items: LevelKeysProps[]) => {
  const key: Record<string, number> = {}
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items)
  return key
}

export const createOpenChangeHandler = (
  levelKeys: Record<string, number>,
  setOpenKeys: (keys: string[]) => void,
) => {
  const handler: MenuProps['onOpenChange'] = openKeys => {
    const currentOpenKey = openKeys.find(key => !openKeys.includes(key))

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey])

      setOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
      )
    } else {
      setOpenKeys(openKeys)
    }
  }

  return handler
}
