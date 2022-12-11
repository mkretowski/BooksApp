{
  ('use strict');
  const select = {
    templateOf: {
      bookItem: '#template-book',
    },
    booksList: '.books-list',
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.bookItem).innerHTML),
  };

  const coll = {
    getElements() {
      const thisColl = this;
      thisColl.favoriteBooks = [];
      thisColl.allBooks = document.querySelector(select.booksList);
      console.log(thisColl.allBooks);
    },
    initActions: function () {
      const thisColl = this;
      console.log(thisColl);
      /* add addToFavourites as event listener for all books */
      thisColl.allBooks.addEventListener('dblclick', function (event) {
        event.preventDefault();
        thisColl.addToFavorites(event);
      });
    },
    addToFavorites: function (event) {
      const thisColl = this;
      const thisBook = event.target.offsetParent;
      if (thisBook.classList.contains('book__image')) {
        if (thisColl.favoriteBooks.includes(thisBook.getAttribute('data-id'))) {
          thisBook.classList.remove('favorite');
          thisColl.favoriteBooks.splice(thisColl.favoriteBooks.indexOf(thisBook.getAttribute('data-id')), 1);
        } else {
          thisBook.classList.add('favorite');
          thisColl.favoriteBooks.push(thisBook.getAttribute('data-id'));
        }
        console.log(thisColl.favoriteBooks);
      }
    },
    renderCollection: function () {
      const thisColl = this;
      /* find collection container */
      const collectionContainer = document.querySelector('.books-list');
      for (let bookData of thisColl.data.books) {
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
      const thisColl = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisColl);
      console.log('templates:', templates);
      thisColl.initData();
      thisColl.renderCollection();
      thisColl.getElements();
      thisColl.initActions();
    },
    initData: function () {
      const thisColl = this;
      thisColl.data = dataSource;
    },
  };
  coll.init();
}
