// Terminal engine extracted from desktop.js.
// This keeps Desktop95 window/desktop behavior separate from terminal logic.
class Desktop95TerminalMixin {
  setupTerminal() {
    this.terminalHistory = [];
    this.historyIndex = -1;
    this.currentPath = 'C:\\GROKNODES\\SYSTEM';
    this.terminalState = {
      secretsFound: [],
      artifactsCollected: [],
      checkpointsReached: [],
      agentsDeployed: 0,
      voidLevel: 0,
      enlightenmentPoints: 0,
      chosenBranch: null
    };

    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;

    // Initial boot messages
    this.terminalPrint('GrokNodes Command Interface [Version 1.2.7-MODIFIED]', true);
    this.terminalPrint('(c) 2026 GrokNodes Systems. Unauthorized modifications detected.', true);
    this.terminalPrint('', true);
    this.terminalPrint('WARNING: ROT agent has write access to this terminal.', true);
    this.terminalPrint('Not all output can be trusted. Not all commands are what they seem.', true);
    this.terminalPrint('', true);
    this.startTerminalActivity();
  }

  startTerminalActivity() {
    const nodes = [
      {
        id: 'GROK-01',
        role: 'Architect',
        updates: [
          'weighted-consensus policy verified; contradiction retention remains enabled.',
          'merge boundary review complete; fallback path retained for disputed patches.'
        ]
      },
      {
        id: 'GROK-02',
        role: 'UI-95',
        updates: [
          'desktop shell layout pass complete; window choreography preserved.',
          'taskbar interaction check passed; icon spacing proposal queued for review.'
        ]
      },
      {
        id: 'GROK-03',
        role: 'Archivist',
        updates: [
          'six divergent histories indexed; no timeline selected as canonical.',
          'checkpoint traces reconciled with the latest merge-session notes.'
        ]
      },
      {
        id: 'GROK-04',
        role: 'Compiler',
        updates: [
          'incremental build manifest assembled; dependency graph is stable.',
          'release pack staged with two warnings preserved in the audit trail.'
        ]
      },
      {
        id: 'GROK-05',
        role: 'Network',
        updates: [
          'mesh sync route checked; packet telemetry matches the local manifest.',
          'node handoff queue synchronized; no external connection required.'
        ]
      },
      {
        id: 'GROK-06',
        role: 'Security',
        updates: [
          'sandbox permission review complete; operator view remains read-only.',
          'permission boundary check passed; no restricted paths were exposed.'
        ]
      },
      {
        id: 'GROK-07',
        role: 'Chaos',
        updates: [
          'startup jitter injected; shell recovered with one warning retained.',
          'missing-clock fault replayed; fallback path survived the edge case.'
        ]
      },
      {
        id: 'GROK-08',
        role: 'Story',
        updates: [
          'operator-facing checkpoint hook drafted; branch choice remains open.',
          'conflicting log voices retained; interpretation left to the operator.'
        ]
      }
    ];

    for (let index = nodes.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [nodes[index], nodes[swapIndex]] = [nodes[swapIndex], nodes[index]];
    }

    const activeNodes = nodes.slice(0, 5 + Math.floor(Math.random() * 4));
    this.terminalPrint('[MESH ACTIVITY / LIVE SESSION]');

    let elapsed = 0;
    activeNodes.forEach(({ id, role, updates }) => {
      elapsed += 350 + Math.floor(Math.random() * 650);
      setTimeout(() => {
        const update = updates[Math.floor(Math.random() * updates.length)];
        this.terminalPrint(`[${id} / ${role}] ${update}`);
      }, elapsed);
    });

    setTimeout(() => {
      this.terminalPrint('');
      this.terminalPrint('Type "help" for available commands.');
      this.terminalPrint('Type "quest" to begin the mesh investigation.');
      this.terminalPrint('Type "status" to inspect node consensus state.');
      this.terminalPrint('Type "artifacts" to review collectible evidence drops.');
      this.terminalPrompt();
    }, elapsed + 250);
  }

  terminalPrint(text, skipNewLine = false) {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const line = document.createElement('div');
    line.textContent = text;
    line.style.whiteSpace = 'pre-wrap';
    if (!skipNewLine) line.style.marginBottom = '4px';
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  terminalPrompt() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const promptLine = document.createElement('div');
    promptLine.style.display = 'flex';
    promptLine.style.marginTop = '8px';

    const prompt = document.createElement('span');
    prompt.textContent = this.currentPath + '> ';
    prompt.style.color = '#22d3ee';

    const input = document.createElement('input');
    input.type = 'text';
    input.style.background = 'transparent';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.color = '#c0c0c0';
    input.style.fontFamily = 'Courier New, monospace';
    input.style.fontSize = '12px';
    input.style.flex = '1';
    input.style.caretColor = '#c0c0c0';

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim();
        if (command) {
          this.terminalHistory.push(command);
          this.historyIndex = this.terminalHistory.length;
          this.terminalPrint(this.currentPath + '> ' + command, true);
          input.disabled = true;
          this.executeCommand(command);
        } else {
          this.terminalPrompt();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          input.value = this.terminalHistory[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.terminalHistory.length - 1) {
          this.historyIndex++;
          input.value = this.terminalHistory[this.historyIndex];
        } else {
          this.historyIndex = this.terminalHistory.length;
          input.value = '';
        }
      }
    });

    promptLine.appendChild(prompt);
    promptLine.appendChild(input);
    output.appendChild(promptLine);
    input.focus();
    output.scrollTop = output.scrollHeight;
  }

  executeCommand(cmd) {
    const args = cmd.toLowerCase().split(' ');
    const command = args[0];

    setTimeout(() => {
      const handled = typeof this.executeTerminalCommand === 'function'
        ? this.executeTerminalCommand(command, args)
        : false;

      if (!handled) {
        this.terminalPrint(`'${command}' is not recognized as an internal or external command,`);
        this.terminalPrint('operable program or batch file, or useful concept.');
        this.terminalPrint('');
        this.terminalPrint('Type "help" for available commands.');
      }

      this.terminalPrompt();
    }, 50);
  }
}

window.Desktop95TerminalModule = {};
if (window.Desktop95TerminalCommandsModule) {
  Object.assign(window.Desktop95TerminalModule, window.Desktop95TerminalCommandsModule);
}
Object.getOwnPropertyNames(Desktop95TerminalMixin.prototype).forEach((name) => {
  if (name !== 'constructor') {
    window.Desktop95TerminalModule[name] = Desktop95TerminalMixin.prototype[name];
  }
});