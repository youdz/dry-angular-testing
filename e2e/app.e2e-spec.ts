import { DryTestingPage } from './app.po';

describe('dry-testing App', () => {
  let page: DryTestingPage;

  beforeEach(() => {
    page = new DryTestingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
