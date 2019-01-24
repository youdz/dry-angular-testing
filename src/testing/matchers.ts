import {TestContext} from './test-context';

export const MATCHERS: jasmine.CustomMatcherFactories = {
  toDisplay: function<T, H>(util, customEqualityTesters) {
    return {
      compare: function(actual: TestContext<T, H>, expected: string) {
        const textContent = actual.fixture.debugElement.nativeElement.textContent;
        const pass = util.contains(textContent, expected, customEqualityTesters);
        let message: string;
        if (pass) {
          message = `Expected ${actual.fixture.debugElement.nativeElement.innerHTML} not to display ${expected}`;
        } else {
          message = `Expected ${actual.fixture.debugElement.nativeElement.innerHTML} to display ${expected}`;
        }
        return {pass, message};
      }
    };
  }
};
