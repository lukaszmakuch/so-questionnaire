import rosmaro from 'rosmaro';
import {partialReturns, typeHandler, defaultHandler, initialValueLens} from 'rosmaro-binding-utils';
import graph from './graph';

const handler = plan => partialReturns(typeHandler({defaultHandler})(plan));

const Q = pickArrow => (fOpts) => ({
  handler: handler({

    ANSWER: ({action, context}) => ({
      context: {...context, [fOpts.name]: action.value},
      arrow: pickArrow(fOpts, action, context),
    }),

    BACK: ({context}) => ({
      context: {...context, [fOpts.name]: null},
      arrow: 'back',
    }),

    READ_QUESTION: () => fOpts.name,

    READ_ANSWERS: ({context}) => context,

  }),
});

const branchQ = Q(
  ({branches}, {value: answer}) => branches.includes(answer) ? answer : undefined
);
const regularQ = Q(() => 'any');

const Q1 = branchQ({name: 'Q1', branches: ['foo', 'bar', 'baz']});
const Q2 = regularQ({name: 'Q2'});
const Q3 = branchQ({name: 'Q3', branches: ['foo', 'bar']});
const Q4 = regularQ({name: 'Q4'});
const Q5 = regularQ({name: 'Q5'});
const Q6 = regularQ({name: 'Q6'});
const main = {
  lens: () => initialValueLens({
    'Q1': null,
    'Q2': null,
    'Q3': null,
    'Q4': null,
    'Q5': null,
    'Q6': null,
  }),
  handler: defaultHandler,
};

const bindings = {
  'main': main,
  'main:Q1#1': Q1,
  'main:Q2#1': Q2,
  'main:Q2#2': Q2,
  'main:Q3#1': Q3,
  'main:Q3#2': Q3,
  'main:Q4#1': Q4,
  'main:Q5#1': Q5,
  'main:Q6#1': Q6,
  'main:Q6#2': Q6,
  'main:Q6#3': Q6,
};

const model = rosmaro({graph, bindings});

let state;

export const answers = () => model({state, action: {type: 'READ_ANSWERS'}}).result.data;
export const answer = answer => {state = model({state, action: {type: 'ANSWER', value: answer}}).state;};
export const back = () => {state = model({state, action: {type: 'BACK'}}).state;};
export const question = () => model({state, action: {type: 'READ_QUESTION'}}).result.data;