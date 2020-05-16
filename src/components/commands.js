/* A bunch of components for use in .mdx examples content. Mostly related to formatting 
   and annotating example commands/scripts/output.
*/
import React from "react";

// Showing some content on hover.
import { Popover } from 'antd';

import './commands.css';

/* Intended to enclose any number of command/output components. Represents
   some sequence of shell commands (possibly just one) and possibly some output.
*/
export const CommandSession = ({children}) => (
    <pre className="command-session">
      {children}
    </pre>
);

// Command prompt.
const PROMPT_SYMBOL  = '$'
const PROMPT = (<span className="command-prompt">{PROMPT_SYMBOL}</span>);

/* A one-line command invocation.
   TODO: Should probably rename this to something less vague. e.g. "ShellCommand"
*/
export const Command = ({children}) => (
    <div><kbd>{PROMPT} {children}</kbd></div>
);

/* A single shell command split over multiple lines. We automatically insert '>'
   continuation characters at the beginning of each line after the first.
*/
export const MultilineCommand = ({children}) => {
  const transformed = React.Children.map(children, (child, i) => {
    if (typeof(child) !== 'string') {
      // Children may include <SourceAnnot>'s or other non-text elements.
      return child;
    }
    const lines = child.split('\n').map( (line, lineIx) => {
      let pre = '> ';
      if (lineIx === 0) {
        pre = '';
      }
      return pre + line;
    });
    return lines.join('\n');
  });
  return (<div><kbd>{PROMPT} {transformed}</kbd></div>);
}

// TODO: Maybe rename to just "Output" or "SampleOutput" or whatever? Not limited to bash commands
export const CommandOutput = ({children}) => (
    <samp>{children}</samp>
);

/* Annotation components like SourceAnnot and Kw accept a 'kw' property, which should 
   be an int. The idea is that annotations with the same kw value will have the same visual
   treatment. This is useful for drawing parallels between some portion of the source, and
   the corresponding portion of the prose explanation.

   The current implementation is really hacky. Ideally we would be able to actually tie these components
   together functionally, e.g. so that hovering on one applies some highlighting visual treatment to both.
   But this is technically pretty tricky to accomplish.
*/
const colorForKey = (key) => {
  switch (key) {
    case 1:
      return 'green';
    case 2:
      return 'tomato';
    case 3:
      return 'rebeccapurple';
    case undefined:
      return 'dimgray';
    default:
      console.warn('Unexpected kw ', key);
      return 'yellow';
  }
};

const KeySpan = ({children, kw, ...props}) => {
    let lineStyle = kw ? 'solid' : 'dotted';
    if (kw === 0) {
      // TODO: maybe still show underline on hover in this case?
      lineStyle = 'none';
    }
    // We use this hacky border thing rather than the proper text-decoration properties for
    // underlining, because the latter don't let us control the thickness of the underline.
    const style = {
      borderBottom: `.15em ${lineStyle} ${colorForKey(kw)}`,
      paddingBottom: '0.2em',
    };
    // NB: When using antd popover, it inserts its own event handlers for
    // onMouseEnter etc.
    return (
    <span 
      style={style}
      {...props}
    >
      {children}
    </span>
    );
};

/* Intended for annotating command options/flags. Props...
   - short: the short code for this option. e.g. 'n'
   - long: the long code. e.g. 'numeric-sort'
   - gloss: English description of what this flag does
*/
export const Flag = ({children, short, long, gloss, kw, ...props}) => {
  let flagText = '';
  if (short) {
    flagText += '-' + short + ', ';
  }
  if (long) {
    flagText += '--' + long + ', ';
  }
  if (flagText) {
    flagText = flagText.slice(0, flagText.length-2);
  }
  const ttContent = (
      <>
      {flagText && <p className="tt-flags">{flagText}</p>}
      {gloss && <p>{gloss}</p>}
      </>
  );
  const inner = (
      <KeySpan kw={kw} {...props}>{children}</KeySpan>
  );
  if (flagText || gloss) {
    return (
      <Popover content={ttContent}>
        {inner}
      </Popover>
    );
  } else {
    return inner;
  }
};

export const Kw = KeySpan;

/* TODO: Probably overkill. This was intended to wrap prose descriptions accompanying
   examples. But this is kind of annoying, as it precludes using any md formatting
   in this content. And there are already few enough opportunities to use actual
   MarkDown in these mdx files (rather than straight-up jsx).
*/
export const Gloss = ({children, ...props}) => (
    <p className="gloss" {...props}>{children}</p>
);

// TODO: not actually used anymore?
export const FileRef = ({children}) => (
    <code>{children}</code>
);

/* Generic component for annotating some region of source (whether command or script).
   TODO: <Flag> should probably be using this?
   For the content of the popover text, can either provide:
   - text: plain text
   - tt: jsx element
*/
export const SourceAnnot = ({children, text, ...props}) => {
  const inner = (
    <KeySpan {...props}>
      {children}
    </KeySpan>
  );
  if (!props.tt && !text) {
    return inner;
  }
  // TODO: parse text as markdown. Except, I should be doing this in advance,
  // not on the client... Maybe for now just don't do the md thing.
  const tt_content = props.tt || (<p>{text}</p>);
  return (
    <Popover content={tt_content}>
      {inner}
    </Popover>
  );
};
