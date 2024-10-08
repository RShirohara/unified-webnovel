Root = children:([])* {
  const { source: _, ...position } = location()
  return {
    type: "root",
    children: [],
    position
  }
}
