oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g temp
$ temp COMMAND
running command...
$ temp (--version)
temp/0.0.0 linux-x64 node-v18.16.0
$ temp --help [COMMAND]
USAGE
  $ temp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`temp hello PERSON`](#temp-hello-person)
* [`temp hello world`](#temp-hello-world)
* [`temp help [COMMANDS]`](#temp-help-commands)
* [`temp plugins`](#temp-plugins)
* [`temp plugins:install PLUGIN...`](#temp-pluginsinstall-plugin)
* [`temp plugins:inspect PLUGIN...`](#temp-pluginsinspect-plugin)
* [`temp plugins:install PLUGIN...`](#temp-pluginsinstall-plugin-1)
* [`temp plugins:link PLUGIN`](#temp-pluginslink-plugin)
* [`temp plugins:uninstall PLUGIN...`](#temp-pluginsuninstall-plugin)
* [`temp plugins:uninstall PLUGIN...`](#temp-pluginsuninstall-plugin-1)
* [`temp plugins:uninstall PLUGIN...`](#temp-pluginsuninstall-plugin-2)
* [`temp plugins update`](#temp-plugins-update)

## `temp hello PERSON`

Say hello

```
USAGE
  $ temp hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/chinma-yyy/temp/blob/v0.0.0/dist/commands/hello/index.ts)_

## `temp hello world`

Say hello world

```
USAGE
  $ temp hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ temp hello world
  hello world! (./src/commands/hello/world.ts)
```

## `temp help [COMMANDS]`

Display help for temp.

```
USAGE
  $ temp help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for temp.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `temp plugins`

List installed plugins.

```
USAGE
  $ temp plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ temp plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `temp plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ temp plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ temp plugins add

EXAMPLES
  $ temp plugins:install myplugin 

  $ temp plugins:install https://github.com/someuser/someplugin

  $ temp plugins:install someuser/someplugin
```

## `temp plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ temp plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ temp plugins:inspect myplugin
```

## `temp plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ temp plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ temp plugins add

EXAMPLES
  $ temp plugins:install myplugin 

  $ temp plugins:install https://github.com/someuser/someplugin

  $ temp plugins:install someuser/someplugin
```

## `temp plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ temp plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ temp plugins:link myplugin
```

## `temp plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ temp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ temp plugins unlink
  $ temp plugins remove
```

## `temp plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ temp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ temp plugins unlink
  $ temp plugins remove
```

## `temp plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ temp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ temp plugins unlink
  $ temp plugins remove
```

## `temp plugins update`

Update installed plugins.

```
USAGE
  $ temp plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
