const childProcess = require('child_process');
const os = require('os');
const fs = require('fs');

function getCurrentDateTime() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const currentDateTime = getCurrentDateTime();

/* Defines command value based on operating system */
const commandValue =
  os.platform() === 'win32' || os.platform() === 'win64'
    ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
    : `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;

let stdoutValue = ``;

/* Runs shell command to see which process uses CPU and memory the most */
const execProcess = command => {
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      process.stderr.write(`${error}`);
    }

    stdoutValue = stdout.trim();
  });
};

/* Saves log to file every 1 minute */
setInterval(() => {
  const logValue = `${currentDateTime} : ${stdoutValue}\n`;

  fs.appendFile('activityMonitor.log', logValue, err => {
    if (err) throw err;
    console.log('Saved to log!');
  });
}, 60000);

setInterval(() => {
  execProcess(commandValue);
  process.stdout.write(`${stdoutValue}\r`);
}, 1000);
