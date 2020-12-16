# tts-save-cleaner

A command-line tool for cleaning Tabletop Simulator save files.

## Installation

tts-save-cleaner can be installed using [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable).

```sh
npm install --global tts-save-cleaner
# or
yarn global add tts-save-cleaner
```

## Usage

```sh
tts-save-cleaner <path/to/save> <path/to/output>
```

tts-save-cleaner takes two arguments, the path to the file to clean, and the path to save the cleaned file to. These can be the same path, in which case the input file gets overwritten by the clean version.

tts-save-cleaner also takes two options:

- `--roundingAccuracy <n>`: rounds all numbers in the file to `n` decimal places. Defaults to not rounding.
- `--sortContents <guid1> [<guid2> [<guid3> ...]]`: sorts the contents of all objects with the specified GUIDs. Use `-1` to sort objects loaded on the table. Defaults to no objects.

Usage informations is also available via `tts-save-cleaner --help`.

## License

tts-save-cleaner is provided under the [MIT license](https://github.com/nabbydude/tts-save-cleaner/blob/master/LICENSE).
