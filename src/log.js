import readline from 'readline';

export function logProgress(prefix = '', suffix = '') {

  const updateProgress = (progress) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${prefix}${progress}${suffix}`);
  };
  const finish = (text = '') => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${text}\n`);
  };
  return {
    updateProgress,
    finish,
  };
}

const lines = [];

export function logMultiLineProgress(prefix = '', suffix = '', currentLine = false) {
  console.log('');
  if (!currentLine) {
    lines.push(prefix);
  }

  const updateLine = (text = '') => {
    const relativeIndex = currentLine ? 0 : lines.length - lines.indexOf(prefix);
    readline.moveCursor(process.stdout, 0, -relativeIndex);
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    process.stdout.write(`${text}`);
    readline.moveCursor(process.stdout, 0, relativeIndex);
    if (!currentLine) {
      readline.cursorTo(process.stdout, 0);
    }
  };
  const updateProgress = (progress = '') => {
    updateLine(`${prefix}${progress}${suffix}`);
  };
  const finish = (text = '') => {
    if (!currentLine) {
      readline.moveCursor(process.stdout, 0, -lines.length);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${text}\n`);
      readline.moveCursor(process.stdout, 0, lines.length);
      readline.cursorTo(process.stdout, 0);
    } else {
      updateLine(text);
      process.stdout.write(`\n`);
    }
    lines.splice(lines.indexOf(prefix), 1);
  };
  return {
    updateProgress,
    finish,
  };
}
