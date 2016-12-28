# open

Open a file or url in the user's preferred application.

# Node usage

```javascript
var open = require("open");
open("http://www.google.com");
```

`open` takes an optional argument specifying the program to be used to open the
file or URL.

```javascript
open("http://www.google.com", "firefox");
```

# NPM script usage

```javascript
{ ...
  "scripts: {
    ...
    "browser": "node-open http://www.google.com",
    "firefox": "node-open http://www.google.com firefox",
    ...
  },
  ...
}

With development profile

```javascript
open("http://www.google.com", "firefox", "-P development");
```

Getting Error from program (null if success)

```javascript
open("http://www.google.com", "firefox", "-P development", function(Error){
  console.log(Error);
});
```

# Installation

    npm install open

# How it works

- on `win32` uses `start`
- on `darwin` uses `open`
- otherwise uses the `xdg-open` script from [freedesktop.org](http://portland.freedesktop.org/xdg-utils-1.0/xdg-open.html)

# Warning

The same care should be taken when calling open as if you were calling
[child_process.exec](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
directly. If it is an executable it will run in a new shell.
