import React from "react";

import { Popover } from 'antd';

import './commands.css';

export const CommandSession = ({children}) => (
    <pre className="command-session">
      {children}
    </pre>
);

const PROMPT_SYMBOL  = '$'

const PROMPT = (<span className="command-prompt">{PROMPT_SYMBOL}</span>);

// Rather than p to force newlines, should maybe consider css?
// div might be better than p actually?
// Maybe rename to be less ambiguous? BashCommand? ShellCommand?
export const Command = ({children}) => (
    <div><kbd>{PROMPT} {children}</kbd></div>
);

// TODO: This could probably be merged with Command
// Though it could be nice to automatically insert line continuation '>' characters
// (and may want some special styling for them)
//export const MultilineCommand = Command;
export const MultilineCommand = ({children}) => {
  console.log(children);
  const transformed = React.Children.map(children, (child, i) => {
    if (typeof(child) !== 'string') {
      return child;
    }
    const lines = child.split('\n').map( (line, lineIx) => {
      let pre = '> ';
      if (lineIx === 0) {
        //pre = (i === 0) ? PROMPT + ' ' : '';
        pre = '';
      }
      return pre + line;
    });
    return lines.join('\n');
  });
  return (<div><kbd>{transformed}</kbd></div>);
}

// TODO: Maybe rename to just "Output" or "SampleOutput" or whatever? Not limited to bash commands
export const CommandOutput = ({children}) => (
    <samp>{children}</samp>
);

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

//export const Flag = KeySpan;

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

// Probably overkill
export const Gloss = ({children, ...props}) => (
    <p className="gloss" {...props}>{children}</p>
);

export const FileRef = ({children}) => (
    <code>{children}</code>
);

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
