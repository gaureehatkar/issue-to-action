'use client';
import React from 'react';

export function FormattedText({ text }: { text: string }) {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

  return (
    <div className="text-base leading-relaxed text-card-foreground/90 whitespace-pre-wrap font-body">
      {text.split('\n').map((line, index, array) => (
        <span key={index}>
          {line.split(urlRegex).map((part, i) => {
            if (part.match(urlRegex)) {
              return (
                <a
                  key={i}
                  href={part}
                  className="text-primary underline hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
          {index < array.length - 1 && '\n'}
        </span>
      ))}
    </div>
  );
}
