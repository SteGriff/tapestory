# tapestory

Tapestory is about therapeutic creativity. It will let you answer thought-provoking questions in a colourful and individual way.

Read ["I am making a creativity tool"](https://stegriff.co.uk/upblog/i-am-making-a-creativity-tool/) and  ["Life's rich tapestory"](https://stegriff.co.uk/upblog/lifes-rich-tapestory/).

## Tech

Vite + Vue3 + Typescript

I'm writing this project to learn the latest and best stuff in Vue, like the Compositional API, `<script setup>`, and typescript integration.

## Setup

Requires Node >16

```
npm i
npm run start
```

## Problem Notes

2022-12-02

Wrestling with element IDs. Elements have unique CIDs, but we can't edit them properly after looking them up by `.find`. See `state.selectedElement`.

Want to remodel the UI so that a box is actually stateful in having view/edit modes, so text is not always one-click editable. This will make it easier to have click-drag interactions.
