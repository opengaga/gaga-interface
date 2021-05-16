import { Fragment, Comment, Text, VNode, isVNode } from 'vue'

export const isValid = (value: any): boolean => {
  return value !== undefined && value !== null && value !== ''
}

export function isEmptyElement(c: VNode) {
  return (
    c.type === Comment ||
    (c.type === Fragment && (c.children as { length: number }).length === 0) ||
    (c.type === Text && (c.children as string)?.trim() === '')
  )
}

export const flattenChildren = (children: any[] = [], filterEmpty = true) => {
  const temp = Array.isArray(children) ? children : [children]
  const res: any = []
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty))
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children, filterEmpty))
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child)
      } else if (!filterEmpty) {
        res.push(child)
      }
    } else if (isValid(child)) {
      res.push(child)
    }
  })
  return res
}

export const getSlot = (self: any, name = 'default', options = {}): VNode[] => {
  if (isVNode(self)) {
    if (self.type === Fragment) {
      return name === 'default' ? flattenChildren(self.children as any) : []
    } else if (self.children && self.children[name]) {
      return flattenChildren(self.children[name](options))
    } else {
      return []
    }
  } else {
    const res = self.$slots[name] && self.$slots[name](options)
    return flattenChildren(res)
  }
}
