import React from "react";

import { Popover } from 'antd';

export const CommandSession = ({children}) => (
    <pre className="command-session">
      {children}
    </pre>
);

const PROMPT = '$'

// Rather than p to force newlines, should maybe consider css?
// div might be better than p actually?
// Maybe rename to be less ambiguous? BashCommand? ShellCommand?
export const Command = ({children}) => (
    <div><kbd>{PROMPT} {children}</kbd></div>
);

export const MultilineCommand = ({children}) => {
  return (<div>{children}</div>);
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
    default:
      console.warn('Unexpected kw ', key);
      return 'yellow';
  }
};

const KeySpan = ({children, kw}) => (
    <span style={{color: colorForKey(kw)}}>{children}</span>
);

export const Flag = KeySpan;

export const Kw = KeySpan;

// Probably overkill
export const Gloss = ({children}) => (
    <p className="gloss">{children}</p>
);

export const FileRef = ({children}) => (
    <code>{children}</code>
);

export const SourceAnnot = ({children, text}) => {
  // TODO: parse text as markdown
  const tt_content = (<p>{text}</p>);
  return (
    <Popover content={tt_content}>
    {children}
    </Popover>
  );
};
