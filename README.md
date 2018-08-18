# so-questionnaire

This repository contains code for the following question: ["Is a statechart / finite state machine suitable for modelling a questionnaire"](https://stackoverflow.com/questions/51881085/is-a-statechart-finite-state-machine-suitable-for-modelling-a-questionnaire).

To illustrate how __transitions may be implemented without using any external state__, I used the [Rosmaro Editor](https://rosmaro.js.org/editor/) and drew a flat FSM:
![The Rosmaro Editor](graph.png?raw=true)
The `graph.png` file is automatically generated.

As soon as it grows bigger, __subgraphs may be used to reduce the complexity of the graph__.

In order to run this example, clone it and run the following commands:
```
$ npm i
$ npm start
```
It'll start a REPL with the following global functions: `question`, `answer`, `answers`, `back`. Here's how it works:
```javascript
$ question()
'Q1'
$ answer('baz')
undefined
$ question();
'Q6'
$ answer('anything')
undefined
$ answers();
{ Q1: 'baz',
  Q2: null,
  Q3: null,
  Q4: null,
  Q5: null,
  Q6: 'anything' }
$ back()
undefined
$ question()
'Q1'
$ answer('foo')
undefined
$ question()
'Q2'
$ answer('test')
undefined
$ answers()
{ Q1: 'foo', Q2: 'test', Q3: null, Q4: null, Q5: null, Q6: null }
$ question()
'Q3'
$ answer('bar')
undefined
$ question()
'Q4'
$ answer('fuzz')
undefined
$ question()
'Q6'
$ back()
undefined
$ question()
'Q4'
$ 
```