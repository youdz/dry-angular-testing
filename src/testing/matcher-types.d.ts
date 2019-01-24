declare namespace jasmine {
  interface Matchers<T> {
    toDisplay(expected: string): boolean;
  }
}
