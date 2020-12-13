# Sounds

A sound generation/track building application for the web tested in Chrome.

This app was created using:

- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## What does this app let you do?

- Play notes/drums generated from the browsers apis.
- Build tracks as combinations of notes/drums.
- Save tracks to a local database to be played again in the future.
- Generate random tracks.
- Load tracks from file.
- Export tracks as importable format.

## What is a "track", understanding the data structure

A track is:

- Unique Identifier
- Name
- Created Date
- Group of layers
- Control Configuration

### What is a "layer"

A layer is a list of notes to be played in a specific order
Multiple layers can be used within one track to create overlapping sounds

## How the applications logic should flow

1. On initial load the application will have an empty state and a open connection to the database
2. Fire a event to lookup the stored tracks and load them into the state
3. When preforming any action first the database then if successful create a new state from the previous containing the new data

## What needs to be done?

- If the client only has one channel then remove the panner control
- Allow additional layers to be created
- When clicking on an existing note/drum within the layer, allow deletion and customisation
- Allow dragging between layers or reordering within the current layer
