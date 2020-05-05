import React from "react"

export const CommandSession = ({children}) => (
    <div className="command-session">
      {children}
    </div>
);

// Rather than p to force newlines, should maybe consider css?
// div might be better than p actually?
export const Command = ({children}) => (
    <div><kbd>$ {children}</kbd></div>
);

export const CommandOutput = ({children}) => (
    <div><samp>{children}</samp></div>
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

export const Gloss = ({children}) => (
    <p className="gloss">{children}</p>
);

export const FileRef = ({children}) => (
    <code>{children}</code>
);
