Root = children:(FlowContent)* {
  const { source: _, ...position } = location()
  return {
    type: "root",
    children: {children}.children,
    position
  }
}

// FlowContent
FlowContent = Paragraph

Paragraph = match:(!break|2..| (PhrasingContent))+ {
  const { source: _, ...position } = location();
  const children = {match}.match
    .map((nodes) => nodes[1])
    .flat();
  return {
    type: "paragraph",
    children: {children}.children,
    position
  };
}

// PhrasingContent
PhrasingContent = InlinePhrasingContent

// InlinePhrasingContent
InlinePhrasingContent = Text

// InlinePhrasingContent:Text
Text = text:$(text) {
  const { source: _, ...position } = location();
  return {
    type: "text",
    value: {text}.text,
    position
  };
}

break = "\r\n" / "\n"
text = [^\n\r]
