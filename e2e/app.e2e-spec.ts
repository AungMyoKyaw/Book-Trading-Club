import { BookTradingClubPage } from './app.po';

describe('book-trading-club App', function() {
  let page: BookTradingClubPage;

  beforeEach(() => {
    page = new BookTradingClubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
