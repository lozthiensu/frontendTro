import { TroODayPage } from './app.po';

describe('tro-oday App', () => {
  let page: TroODayPage;

  beforeEach(() => {
    page = new TroODayPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
