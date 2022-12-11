{
  ('use strict');
  const select = {
    templateOf: {
      bookItem: '#template-book',
    },
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.bookItem).innerHTML),
  };

  const app = {
    initCollection: function () {
      const thisApp = this;
      /* find collection container */
      const collectionContainer = document.querySelector('.books-list');
      for (let bookData of thisApp.data.books) {
        console.log(bookData);
        /* generate HTML based on temlate */
        const generatedHTML = templates.bookItem(bookData);
        /* create element using utils.createElementFromHTML */
        bookData.element = utils.createDOMFromHTML(generatedHTML);
        /* add element to collection */
        collectionContainer.appendChild(bookData.element);
      }
    },
    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('templates:', templates);
      thisApp.initData();
      thisApp.initCollection();
    },
    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },
  };
  app.init();
}
