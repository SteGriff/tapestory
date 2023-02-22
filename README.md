# tapestory

Tapestory is about therapeutic creativity. It will let you answer thought-provoking questions in a colourful and individual way.

Read ["I am making a creativity tool"](https://stegriff.co.uk/upblog/i-am-making-a-creativity-tool/) and ["Life's rich tapestory"](https://stegriff.co.uk/upblog/lifes-rich-tapestory/).

## Tech

Vite + Vue3 + Typescript

I'm writing this project to learn the latest and best stuff in Vue, like the Compositional API, `<script setup>`, and typescript integration.

## Setup

Requires Node >16

```
npm i
npm run start
```

## Engineering Notes

Everything is an `IStoryElement`. Some elements can have text and colour, these are `IColourStoryElement` and they inherit from the base interface. When an element is deleted, the `deleted` flag is set to true instead of removing it from memory.

Every element has a unique ID generated by the `cuid` library.

Needs localstorage and PWA.

Long-term, the server will allow any tapestory to be saved anonymously anytime, stored against a unique ID. All stories will be immutable. So to edit/continue, you just remix/fork your existing one and when you're done it gets a new ID. This would also let you remix anyone else's story if they made the ID public. Could do five word phrases or CUIDs for the IDs.

## Visual Design Notes

~~Earlier versions made the + button follow the most recent style; this has been lost, it would be nice to have it back.~~ Done :)

Need to experiment with restricting the palettes:

- There should be a lot fewer base palettes.
- Consider going for 3 or 4 colours (plus B+W) instead of 5
- Palette could/should be global to the project instead of per-element

Need a way to change background colour (pick from palette/black/white)

## TODO

### App

- [x] Localstorage
- [ ] PWA

### Project/Story

- [x] StoryProject data like background colour, title, ID
- [x] "Fresh Project" button
- [ ] Background colour
- [ ] Global palette? Experiment
- [ ] Bottom toolbar - split by project/element?

### UI

- [x] - button should follow latest
- [x] Writing prompts
- [ ] Help button against initial prompt
- [ ] Slide elements side-to-side
- [x] Add connectors and flourishes
- [ ] Connector tools - width, type, colour, remove N/A tooling
- [ ] Reorder elements with drag'n'drop

What to call the story elements, for users? Cards? Blocks? Elements?

## Problem Notes

### 2023-02-10

Ok, I can get a handle on this. Giant overlay text editor when you clickt the 'abc' button on an element, we can do it!

### 2022-12-02

Wrestling with element IDs. Elements have unique CUIDs, but we can't edit them properly after looking them up by `.find`. See `state.selectedElement`.

Want to remodel the UI so that a box is actually stateful in having view/edit modes, so text is not always one-click editable. This will make it easier to have click-drag interactions.
