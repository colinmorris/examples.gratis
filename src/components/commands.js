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
    case 3:
      return 'rebeccapurple';
    default:
      console.warn('Unexpected kw ', key);
      return 'yellow';
  }
};

const KeySpan = ({children, kw, ...props}) => (
    <span style={{color: colorForKey(kw)}} {...props}>{children}</span>
);

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
      {flagText && <p className="flags">{flagText}</p>}
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
