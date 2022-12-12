{
  ('use strict');
  const select = {
    templateOf: {
      bookItem: '#template-book',
    },
    booksList: '.books-list',
    filters: '.filters',
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.bookItem).innerHTML),
  };

  const coll = {
    getElements() {
      console.log(select.templateOf.bookItem);
      const thisColl = this;
      thisColl.favoriteBooks = [];
      thisColl.filters = [];
      thisColl.allBooks = document.querySelector(select.booksList);
      thisColl.filtersAll = document.querySelector(select.filters);
    },
    initActions: function () {
      const thisColl = this;
      /* add addToFavourites as event listener for all books */
      thisColl.allBooks.addEventListener('dblclick', function (event) {
        event.preventDefault();
        thisColl.addToFavorites(event);
      });
      thisColl.filtersAll.addEventListener('change', function (event) {
        event.preventDefault();
        thisColl.addFilter(event);
        thisColl.hideBooks();
      });
    },
    addFilter: function (event) {
      const thisColl = this;
      const thisFilter = event.target;
      if (!thisFilter.checked) {
        thisColl.filters.splice(thisColl.filters.indexOf(thisFilter.value, 1));
      } else {
        thisColl.filters.push(thisFilter.value);
      }
      console.log(thisColl.filters);
    },
    hideBooks: function () {
      const thisColl = this;
      for (let book of thisColl.data.books) {
        let bookImage = book.element.querySelector('.book__image');
        if (bookImage.classList.contains('hidden')) {
          bookImage.classList.remove('hidden');
        }
        console.log(book.details);
        for (let filter of thisColl.filters) {
          if (!book.details[filter] && !bookImage.classList.contains('hidden')) {
            bookImage.classList.add('hidden');
            console.log(book.details, filter);
            break;
          }
        }
      }
    },
    determineRatingBgc: function (rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
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
      }
    },

    renderCollection: function () {
      const thisColl = this;
      /* find collection container */
      const collectionContainer = document.querySelector('.books-list');
      for (let bookData of thisColl.data.books) {
        bookData.ratingBgc = thisColl.determineRatingBgc(bookData.rating);
        bookData.ratingWidth = bookData.rating * 10;
        //const style = 'style=width:' + ratingWidth + '%; background:' + ratingBgc;
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
      console.log('thisColl:', thisColl);
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
