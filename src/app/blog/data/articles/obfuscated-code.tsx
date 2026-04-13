import { Article } from '../index';

const article: Article = {
  slug: 'obfuscated-code',
  title: {
    en: 'Claude Code Was Never Hidden, Just Obfuscated',
    es: 'Claude Code nunca estuvo oculto, solo ofuscado',
  },
  description: {
    en: 'CLI tools can\'t live on a server. The code has to be on your machine. So how do companies protect it?',
    es: 'Las herramientas CLI necesitan estar en tu máquina, pero el código no lo podemos entender. ¿Cómo lo protegen las empresas?',
  },
  date: '2026-04-13',
  readingTime: 6,
  image: '/Claude_AI_symbol.svg',
  tags: ['security', 'IP Protection', 'python', 'obfuscation'],
  content: {
    en: {
      sections: [
        // TL;DR
        {
          type: 'tldr',
          content:
            'TL;DR: Claude Code\'s source was leaked via a .map file, but the code was always on your machine, just obfuscated. CLI tools can\'t live on a server, so companies use obfuscation (Node.js) and compilation (Python/Nuitka) to protect IP. After the leak, Claude Code moved from obfuscated JS to a compiled binary.',
        },

        // 1. HOOK
        {
          type: 'paragraph',
          content:
            'A few weeks ago, a source map file (.map) was accidentally shipped with Claude Code, making the entire source readable. The internet reacted like it was a leak. But that code had always been on your computer. Every line of it. You just couldn\'t read it.',
        },
        {
          type: 'paragraph',
          content:
            'This is the fundamental problem with CLI tools. Unlike a SaaS where your code stays safely on your servers, a CLI has to run on the user\'s machine. The code lands in their node_modules/ folder and Node.js reads it locally. There is no server in the middle. So if you want to protect your source, you can\'t encrypt it because then the runtime can\'t execute it either. What you can do is obfuscate it.',
        },

        // 3. OBFUSCATION: WHAT IT ACTUALLY IS
        {
          type: 'heading',
          level: 2,
          content: 'Obfuscation is not encryption',
        },
        {
          type: 'paragraph',
          content:
            'Encrypted code cannot be executed by anyone or anything without a decryption key first. The bytes are scrambled. The machine can\'t run it, you can\'t read it, nobody can do anything with it until it\'s decrypted back.',
        },
        {
          type: 'paragraph',
          content:
            'Obfuscated code is different. The machine runs it perfectly. Every function call, every conditional, every loop works exactly as the original. But a human looking at the source sees variable names like _0x3c4f, control flow that jumps around nonsensically, and strings encoded into hex arrays. The logic is preserved, the readability is destroyed.',
        },

        {
          type: 'paragraph',
          content: 'A simple example. This is a function before obfuscation:',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `function calculateDiscount(price, userTier) {
  if (userTier === "premium") {
    return price * 0.8;
  }
  return price * 0.95;
}

console.log(calculateDiscount(100, "premium"));
console.log(calculateDiscount(100, "basic"));`,
          output: '80\n95',
        },
        {
          type: 'paragraph',
          content: 'And this is the same function after running it through an obfuscator:',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `var _0xa3=['\\x70\\x72\\x65\\x6d\\x69\\x75\\x6d'];
(function(_0x3c,_0x1a){var _0x2d=function(_0x4e){
while(--_0x4e){_0x3c['push'](_0x3c['shift']());}};
_0x2d(++_0x1a);}(_0xa3,0x1));var _0x4b=function(_0xc,_0xd){
return _0xa3[_0xc-0x0];};function _0x7f2(_0xe,_0xf){
if(_0xf===_0x4b(0x0)){return _0xe*0.8;}return _0xe*0.95;}

console.log(_0x7f2(100, "premium"));
console.log(_0x7f2(100, "basic"));`,
          output: '80\n95',
        },

        // 4. HOW NODE.JS DOES THIS
        {
          type: 'heading',
          level: 2,
          content: 'How Node.js packages handle this',
        },
        {
          type: 'paragraph',
          content:
            'In the JavaScript world there are two layers. Minification (Terser, Webpack) strips whitespace, shortens variable names, and collapses code into a compact form. It\'s primarily for performance, but it makes the code harder to read as a side effect. Actual obfuscation goes much further: tools like javascript-obfuscator encode string literals into arrays, flatten control flow so if/else blocks become switch statements jumping between random labels, inject dead code that looks real but never runs, and wrap everything in self-invoking functions. Functionally identical. Extremely painful to reverse engineer.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Minification (Terser) - smaller, less readable
npx terser src/index.js -o dist/index.min.js -c -m

# Obfuscation (javascript-obfuscator) - intentionally unreadable
npx javascript-obfuscator src/index.js \\
  --output dist/index.obfuscated.js \\
  --string-array true \\
  --string-array-encoding rc4 \\
  --control-flow-flattening true \\
  --dead-code-injection true`,
        },
        {
          type: 'paragraph',
          content:
            'Then there are source maps. A .map file is a dictionary that maps obfuscated code back to the original source, line by line, so that when an error hits in production the stack trace still points somewhere useful. Companies generate them for internal debugging. They are not supposed to ship them. That\'s what happened with Claude Code: the .map file went out by mistake, and suddenly anyone could reconstruct readable source from the obfuscated bundle.',
        },

        // 5. THE PYTHON WAY
        {
          type: 'heading',
          level: 2,
          content: 'How to do this in Python',
        },
        {
          type: 'paragraph',
          content:
            'Python is a different beast. It\'s traditionally interpreted: you ship .py files, everyone can read them. There are lighter options like shipping .pyc bytecode or using Cython to compile to C, but they have limitations. Bytecode is trivially decompilable, and Cython requires annotating your code.',
        },
        {
          type: 'paragraph',
          content:
            'The real solution is Nuitka. It compiles your entire Python program into native machine code, follows all your imports, resolves dependencies, and produces a binary you can package as a wheel. The user runs pip install your-package and gets a working module. No .py files to open. No bytecode to decompile. Just a compiled binary that Python imports like any other module.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Compile a Python package with Nuitka
nuitka --module my_package \\
  --include-package=my_package \\
  --output-dir=dist/`,
          output: 'Nuitka: Compiling module my_package...\nNuitka: Completed. Output: dist/my_package.cpython-311-x86_64-linux-gnu.so',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# What a normal wheel looks like inside
unzip your_package-1.0.0-py3-none-any.whl -d unpacked/
ls unpacked/your_package/`,
          output: '__init__.py   core.py   utils.py',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# What a Nuitka-compiled wheel looks like inside
unzip your_package-1.0.0-cp311-cp311-linux_x86_64.whl -d unpacked/
ls unpacked/your_package/`,
          output: '__init__.cpython-311-x86_64-linux-gnu.so',
        },

        // 6. WHAT HAPPENED NEXT
        {
          type: 'heading',
          level: 2,
          content: 'What Claude Code did after the leak',
        },
        {
          type: 'paragraph',
          content:
            'Here\'s where it gets interesting. I was curious about what Claude Code\'s code actually looks like now, so I went to check. When it was an npm package, you could navigate to node_modules/@anthropic-ai/claude-code/ and find obfuscated .js files. That\'s the code the .map file decoded.',
        },
        {
          type: 'paragraph',
          content:
            'But when I looked at the current installation, there are no .js files. No node_modules. The entire thing is now a compiled Mach-O binary. A single ~200MB arm64 executable.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `file ~/.local/share/claude/versions/2.1.104`,
          output: '/Users/markel/.local/share/claude/versions/2.1.104: Mach-O 64-bit executable arm64',
        },
        {
          type: 'code',
          language: 'bash',
          content: `ls -lh ~/.local/share/claude/versions/`,
          output: '-rwxr-xr-x  192M  2.1.100\n-rwxr-xr-x  192M  2.1.101\n-rwxr-xr-x  192M  2.1.104',
        },
        {
          type: 'paragraph',
          content:
            'They moved from obfuscated JavaScript to a fully compiled native binary. No more source to obfuscate. No more .map files that could accidentally leak. No more readable code at all. Just machine instructions.',
        },
        {
          type: 'paragraph',
          content:
            'This is the exact same progression we described for Python: first you try bytecode (.pyc), then you compile to native code (Cython/Nuitka). Claude Code went through the same evolution in real time, just on the JavaScript side. The .map incident was the trigger that pushed them from "code you can\'t read" to "there is no code, only a binary."',
        },

        // 7. CLOSING
        {
          type: 'heading',
          level: 2,
          content: 'The code was always there',
        },
        {
          type: 'paragraph',
          content:
            'The source map incident didn\'t expose something hidden. It made something readable. The obfuscated JavaScript was already sitting in the node_modules/ folder of every developer who installed it. Their computers were reading it, parsing it, executing it every day. The .map file just gave humans the same ability.',
        },
        {
          type: 'paragraph',
          content:
            'And this is the fundamental reality of CLI tools: when your product has to run on someone else\'s machine, your code is on their machine. Obfuscation makes it impractical to read, not impossible. A veil, not a wall. With enough time and skill, someone can always reverse engineer what the machine is executing. Even a compiled binary is not truly safe from a determined reverse engineer with a disassembler.',
        },
        {
          type: 'paragraph',
          content:
            'The tools exist. They work. And the next time a source map leaks, remember: the code was always there. You just couldn\'t read it.',
        },
      ],
    },
    es: {
      sections: [
        // TL;DR
        {
          type: 'tldr',
          content:
            'TL;DR: El código fuente de Claude Code se filtró por un archivo .map, pero el código siempre ha estado en tu ordenador, solo que ofuscado. Las herramientas CLI necesitan estar disponibles localmente, así que las empresas usan ofuscación y compilación para proteger su IP. Tras la filtración, Claude Code pasó de JS ofuscado a un binario compilado.',
        },

        // 1. HOOK
        {
          type: 'paragraph',
          content:
            'Hace unas semanas, un archivo de source map (.map) se incluyó por error en un release de Claude Code, haciendo todo el código fuente legible. Internet reaccionó como si fuera una filtración. Pero ese código siempre había estado en tu ordenador. Cada línea. Simplemente no podías leerlo.',
        },
        {
          type: 'paragraph',
          content:
            'Este es el problema fundamental de las herramientas CLI. A diferencia de un SaaS donde el código queda seguro en los servidores, una CLI tiene que ejecutarse en la máquina del usuario. El código lo descargamos en node_modules/ y Node.js lo lee localmente. No hay servidor en medio. Si quieres proteger tu código, no puedes encriptarlo porque entonces el runtime tampoco podría ejecutarlo. Lo que puedes hacer es ofuscarlo.',
        },

        // 3. OFUSCACION: QUE ES
        {
          type: 'heading',
          level: 2,
          content: 'Ofuscación no es encriptación',
        },
        {
          type: 'paragraph',
          content:
            'El código encriptado no puede ser ejecutado sin una clave de desencriptación. Los bytes están desordenados. La máquina no puede ejecutarlo, tú no puedes leerlo, por eso no sirve la encriptación.',
        },
        {
          type: 'paragraph',
          content:
            'El código ofuscado es diferente. La máquina lo puede ejecutar perfectamente. Cada llamada a función, cada if, cada bucle funciona exactamente como el original. Pero un humano mirando el código ve nombres de variables como _0x3c4f. Hacen del código un laberinto donde la lógica se conserva pero no se puede entender.',
        },

        {
          type: 'paragraph',
          content:
            'Un ejemplo simple. Esta es una función antes de la ofuscación:',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `function calculateDiscount(price, userTier) {
  if (userTier === "premium") {
    return price * 0.8;
  }
  return price * 0.95;
}

console.log(calculateDiscount(100, "premium"));
console.log(calculateDiscount(100, "basic"));`,
          output: '80\n95',
        },
        {
          type: 'paragraph',
          content:
            'Y esta es la misma función después de pasarla por un ofuscador:',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `var _0xa3=['\\x70\\x72\\x65\\x6d\\x69\\x75\\x6d'];
(function(_0x3c,_0x1a){var _0x2d=function(_0x4e){
while(--_0x4e){_0x3c['push'](_0x3c['shift']());}};
_0x2d(++_0x1a);}(_0xa3,0x1));var _0x4b=function(_0xc,_0xd){
return _0xa3[_0xc-0x0];};function _0x7f2(_0xe,_0xf){
if(_0xf===_0x4b(0x0)){return _0xe*0.8;}return _0xe*0.95;}

console.log(_0x7f2(100, "premium"));
console.log(_0x7f2(100, "basic"));`,
          output: '80\n95',
        },

        // 4. COMO LO HACE NODE.JS
        {
          type: 'heading',
          level: 2,
          content: 'Cómo lo hacen los paquetes de Node.js',
        },
        {
          type: 'paragraph',
          content:
            'En el mundo JavaScript hay dos capas. La primera es la minificación: eliminar espacios, acortar variables y comprimir el código. Sirve principalmente para reducir el tamaño del archivo, pero de paso hace el código más difícil de leer. La segunda capa es la ofuscación real. Herramientas como javascript-obfuscator convierten strings en arrays, aplanan el flujo de control convirtiendo if/else en switch statements con etiquetas aleatorias, inyectan código de relleno que nunca se ejecuta, y envuelven todo en funciones auto-invocadas. El resultado es código funcionalmente idéntico que es muy difícil de descifrar.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Minificación - más pequeño, menos legible
npx terser src/index.js -o dist/index.min.js -c -m

# Ofuscación - intencionalmente ilegible
npx javascript-obfuscator src/index.js \\
  --output dist/index.obfuscated.js \\
  --string-array true \\
  --string-array-encoding rc4 \\
  --control-flow-flattening true \\
  --dead-code-injection true`,
        },
        {
          type: 'paragraph',
          content:
            'Y luego están los source maps. Un archivo .map es un diccionario que mapea el código ofuscado de vuelta al original. Se usa para depuración interna: cuando falla algo en producción, el stack trace apunta a las líneas y variables reales. Las empresas los generan para uso propio, pero no deberían distribuirlos. Eso es exactamente lo que pasó con Claude Code. Con ese archivo, cualquiera podía reconstruir el código legible a partir del paquete ofuscado.',
        },

        // 5. LA VIA PYTHON
        {
          type: 'heading',
          level: 2,
          content: 'Cómo hacer esto en Python',
        },
        {
          type: 'paragraph',
          content:
            'Python es otro mundo. Es un lenguaje interpretado donde tradicionalmente envías archivos .py y todo el mundo puede leerlos. Hay opciones más ligeras como distribuir bytecode .pyc o usar Cython para compilar a C, pero tienen limitaciones. El bytecode se decompila fácilmente, y Cython requiere anotar tu código.',
        },
        {
          type: 'paragraph',
          content:
            'La solución real es Nuitka. Compila tu programa Python entero a código máquina nativo, resuelve todas las dependencias y produce un binario que puedes empaquetar como wheel. El usuario hace pip install tu-paquete y todo funciona. No hay archivos .py que abrir. No hay bytecode que decompilar. Solo un binario compilado que Python importa como cualquier otro módulo.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Compilar un paquete Python con Nuitka
nuitka --module my_package \\
  --include-package=my_package \\
  --output-dir=dist/`,
          output: 'Nuitka: Compiling module my_package...\nNuitka: Completed. Output: dist/my_package.cpython-311-x86_64-linux-gnu.so',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Wheel normal: código fuente en claro
unzip your_package-1.0.0-py3-none-any.whl -d unpacked/
ls unpacked/your_package/`,
          output: '__init__.py   core.py   utils.py',
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Wheel compilado con Nuitka: solo binario
unzip your_package-1.0.0-cp311-cp311-linux_x86_64.whl -d unpacked/
ls unpacked/your_package/`,
          output: '__init__.cpython-311-x86_64-linux-gnu.so',
        },

        // 6. QUE HIZO CLAUDE CODE DESPUES
        {
          type: 'heading',
          level: 2,
          content: 'Qué hizo Claude Code después de la filtración',
        },
        {
          type: 'paragraph',
          content:
            'Aquí es donde se pone interesante. Tenía curiosidad por ver cómo se ve el código de Claude Code ahora, así que fui a comprobarlo. Cuando era un paquete npm, podías navegar a node_modules/@anthropic-ai/claude-code/ y encontrar archivos .js ofuscados. Ese es el código que el archivo .map decodificó.',
        },
        {
          type: 'paragraph',
          content:
            'Pero cuando miré la instalación actual, no hay archivos .js. No hay node_modules. Todo es ahora un binario Mach-O compilado. Un único ejecutable arm64 de ~200MB.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `file ~/.local/share/claude/versions/2.1.104`,
          output: '/Users/markel/.local/share/claude/versions/2.1.104: Mach-O 64-bit executable arm64',
        },
        {
          type: 'code',
          language: 'bash',
          content: `ls -lh ~/.local/share/claude/versions/`,
          output: '-rwxr-xr-x  192M  2.1.100\n-rwxr-xr-x  192M  2.1.101\n-rwxr-xr-x  192M  2.1.104',
        },

        {
          type: 'paragraph',
          content:
            'Es exactamente la misma progresión que describimos para Python: primero bytecode (.pyc), luego compilación nativa (Cython/Nuitka). Claude Code pasó por esa evolución en tiempo real, solo que en el lado JavaScript. El incidente del .map fue el detonante que los empujó de "código que no puedes leer" a "no hay código, solo un binario."',
        },

        // 7. CIERRE
        {
          type: 'heading',
          level: 2,
          content: 'El código siempre estuvo ahí',
        },
        {
          type: 'paragraph',
          content:
            'El incidente del source map no expuso algo oculto. Hizo algo legible. El JavaScript ofuscado ya estaba en la carpeta node_modules/ de cada desarrollador que lo había instalado. Sus ordenadores lo leían, lo parseaban, lo ejecutaban cada día. El archivo .map simplemente dio a los humanos la misma capacidad.',
        },
        {
          type: 'paragraph',
          content:
            'Las empresas usan estas técnicas porque la alternativa es peor: exponer el código fuente bruto de tu ventaja competitiva a cualquiera que haga npm install o pip install es un riesgo de negocio real. La ofuscación y la compilación suben el coste lo suficiente para que no merezca la pena para la mayoría.',
        },
        {
          type: 'paragraph',
          content:
            'Lo dicho: el código siempre estuvo ahí. Simplemente no podías leerlo.',
        },
      ],
    },
  },
};

export default article;
