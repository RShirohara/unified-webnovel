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
PhrasingContent = Break / Image / InlinePhrasingContent

// PhrasingContent:Break
Break = break {
  const { source: _, ...position } = location();
  return {
    type: "break",
    position
  };
}

// PhrasingContent:Image
Image = ImageStart id:ImageId page:(ImageNext $ImagePage)? ImageEnd {
  const { source: _, ...position } = location();
  const result =  {
    type: "image",
    illustId: {id}.id,
    pageNumber: parseInt({page}?.page?.[1]),
    position
  };
  return Object.fromEntries(Object.entries(result).filter(([key, value]) => value));
}
ImageStart = left "pixivimage:"
ImageId = match:(!(ImageNext / ImageEnd) [0-9])+ {
  return {match}.match
    .map((chars) => chars[1])
    .flat(1)
    .join("");
}
ImageNext = hyphen
ImagePage = match:(!ImageEnd [0-9])+ {
  return {match}.match
    .map((chars) => chars[1])
    .flat(1)
    .join("");
}
ImageEnd = right

// InlinePhrasingContent
InlinePhrasingContent = Ruby / Text

// InlinePhrasingContent:Ruby
Ruby = RubyStart text:RubyText RubyNext ruby:RubyBody RubyEnd {
  const { source: _, ...position } = location();
  return {
    type: "ruby",
    value: {text}.text,
    ruby: {ruby}.ruby,
    position
  };
}
RubyStart = left left "rb:" space*
RubyText = match:(!RubyNext text)+ {
  return {match}.match
    .map((chars) => chars[1])
    .flat(1)
    .join("");
}
RubyNext = space* next space*
RubyBody = match:(!RubyEnd text)+ {
  return {match}.match
    .map((chars) => chars[1])
    .flat(1)
    .join("");
}
RubyEnd = space* right right

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
left = "["
right = "]"
next = ">"
hyphen = "-"
fullWidthSpace = "　"
halfWidthSpace = " "
space = fullWidthSpace / halfWidthSpace
