import * as React from 'react';
import Barrier from '../Barrier';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

type Done = (arg?: any) => void;

it('[Barrier] - Using Barrier with ifDef={[true]} - Should render children', () => {
    const barrier = shallow(
        <Barrier ifDef={[true]}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe('h1');
});

it('[Barrier] - Using Barrier with ifDef={[true, false]} - Should render children', () => {
    const barrier = shallow(
        <Barrier ifDef={[true, false]}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe('h1');
});

it('[Barrier] - Using Barrier with ifDef={[undefined, true]} - Should not render children', () => {
    const barrier = shallow(
        <Barrier ifDef={[undefined, true]}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDef={[undefined]} - Should not render children', () => {
    const barrier = shallow(
        <Barrier ifDef={[undefined]}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDef={undefined} - Should not render children', () => {
    const barrier = shallow(
        <Barrier ifDef={undefined}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDef={null} - Should not render children', () => {
    const barrier = shallow(
        <Barrier ifDef={null}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDef={1} - Should not render children', () => {
    const barrier = shallow(
        <Barrier ifDef={1}>
            <h1>test</h1>
        </Barrier>
    );
    expect(barrier.type()).toBe('h1');
});

const test_object = {
    this: {
        is: {
            a: {
                very: {
                    long: {
                        path: 'yes'
                    }
                }
            },
            another: {
                path: 'np'
            }
        },
        one: 'one',
        two: 'two',
        three: 'three',
        four: {
            five: 'five'
        }
    }
};

it('[Barrier] - Using Barrier with ifDeepDef - Should render children', () => {
    const node = <Barrier ifDeepDef={{
        value: test_object,
        branches: [{
            value: 'this',
            branches: ['is', 'one', 'two', 'three', {
                value: 'four',
                branches: ['five']
            }]
        }]
    }}>
        <h1>test</h1>
    </Barrier>;
    const barrier = shallow(node);
    expect(barrier.type()).toBe('h1');
});

it('[Barrier] - Using Barrier with ifDeepDef - Should not render children', () => {
    const node = <Barrier ifDeepDef={{
        value: test_object,
        branches: [{
            value: 'this',
            branches: ['is', 'six', 'two', 'three', {
                value: 'four',
                branches: ['five']
            }]
        }]
    }}>
        <h1>test</h1>
    </Barrier>;
    const barrier = shallow(node);
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDeepDef - Should not render children', () => {
    const node = <Barrier ifDeepDef={{
        value: test_object,
        branches: [{
            value: 'this',
            branches: ['is', {value: 'six'}, 'two', 'three', {
                value: 'four',
                branches: ['five']
            }]
        }]
    }}>
        <h1>test</h1>
    </Barrier>;
    const barrier = shallow(node);
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDeepDef - Should throw', (done: Done) => {
    try {
        const node = <Barrier ifDeepDef={{
            value: test_object,
            branches: [{
                value: 'this',
                branches: ['is', 'one', 2, 'three', {
                    value: 'four',
                    branches: ['five']
                }]
            }]
        }}>
            <h1>test</h1>
        </Barrier>;
        shallow(node);
        done(new Error('Should be throwing'));
    } catch (e) {
        done();
    }
});

it('[Barrier] - Using Barrier with ifDeepDef - Should throw', (done: Done) => {
    try {
        const node = <Barrier ifDeepDef={{
            value: test_object,
            branches: [{
                value: test_object.this,
                branches: ['is', 'one', 'two', 'three', {
                    value: 'four',
                    branches: ['five']
                }]
            }]
        }}>
            <h1>test</h1>
        </Barrier>;
        shallow(node);
        done(new Error('Should be throwing'));
    } catch (e) {
        done();
    }
});

it('[Barrier] - Using Barrier with ifDeepDef - Should not render children', () => {
    const node = <Barrier ifDeepDef={{
        value: undefined
    }}>
        <h1>test</h1>
    </Barrier>;
    const barrier = shallow(node);
    expect(barrier.type()).toBe(null);
});

it('[Barrier] - Using Barrier with ifDeepDef - Should not render children', () => {
    const node = <Barrier ifDeepDef={{
        value: test_object
    }}>
        <h1>test</h1>
    </Barrier>;
    const barrier = shallow(node);
    expect(barrier.type()).toBe('h1');
});
