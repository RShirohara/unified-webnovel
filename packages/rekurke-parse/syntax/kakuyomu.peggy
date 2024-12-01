Root = children:(ParagraphMargin / Paragraph)* {
	const { source: _, ...position } = location();
	return {
		type: "root",
		children: {children}.children,
		position
	};
}

ParagraphMargin = children:break+ {
	const { source: _, ...position } = location();
	const size = {children}.children.length === 1
		? 1
		: {children}.children.length - 1;
	return {
		type: "paragraphMargin",
		size,
		position
	};
}

Paragraph = match:(!Break|2..| (Break / EscapedLeft / Emphasis / Ruby / Text))+ {
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

EscapedLeft = vertical text:$left {
	const { source: _, ...position } = location();
	return {
		type: "text",
		value: {text}.text,
		position
	};
}

Emphasis = emphasisLeft text:emphasisText emphasisRight {
	const { source: _, ...position } = location();
	return {
		type: "emphasis",
		value: {text}.text,
		position
	};
}
emphasisLeft = left|2|
emphasisRight = right|2|
emphasisText = match:(!right $text)+ {
	return {match}.match
		.map((chars) => chars[1])
		.flat(1)
		.join("");
}

Ruby = text:rubyStart rubyLeft ruby:rubyBody rubyRight {
	const { source: _, ...position } = location();
	return {
		type: "ruby",
		value: {text}.text,
		ruby: {ruby}.ruby,
		position
	};
}
rubyStart = rubyStartVert / rubyStartAuto
rubyStartAuto = match:(!rubyLeft $rubyTextAuto)|1..20| {
	return {match}.match
		.map((chars) => chars[1])
		.flat(1)
		.join("");
}
rubyStartVert = vertical match:(!rubyLeft $text)|1..20| {
	return {match}.match
		.map((chars) => chars[1])
		.flat(1)
		.join("");
}
rubyBody = match:(!rubyRight $text)|1..50| {
	return {match}.match
		.map((chars) => chars[1])
		.flat(1)
		.join("");
}
rubyLeft = left
rubyRight = right
rubyTextAuto = char:. &{
	return {char}.char.match(/^\p{Script=Han}$/u);
}

Break = break {
	const { source: _, ...position } = location();
	return {
		type: "break",
		position
	};
}

Text = text:$(text) {
	const { source: _, ...position } = location();
	return {
		type: "text",
		value: {text}.text,
		position
	};
}

break = "\r\n" / "\n"
left = "《"
right = "》"
text = [^\n\r]
vertical = [|｜]
