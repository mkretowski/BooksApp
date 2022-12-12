{
  ('use strict');

  const select = {
    templateOf: {
      bookItem: '#template-book',
    },
    booksList: '.books-list',
    filters: '.filters',
    bookImage: '.book__image',
  };

  const classNames = {
    book: {
      favorite: 'favorite',
      image: 'book__image',
      imageHidden: 'hidden',
    },
  };

  const templates = {
    bookItem: Handlebars.compile(document.querySelector(select.templateOf.bookItem).innerHTML),
  };

  class BooksCollection {
    constructor() {
      const thisColl = this;
      thisColl.data = dataSource;
      console.log('*** App starting ***');
      console.log('thisColl:', thisColl);
      console.log('templates:', templates);
      thisColl.renderCollection();
      thisColl.getElements();
      thisColl.initActions();
    }

    getElements() {
      const thisColl = this;
      thisColl.favoriteBooks = [];
      thisColl.filters = [];
      thisColl.allBooks = document.querySelector(select.booksList);
      thisColl.filtersAll = document.querySelector(select.filters);
    }

    initActions() {
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
    }

    addFilter(event) {
      const thisColl = this;
      const thisFilter = event.target;
      if (!thisFilter.checked) {
        thisColl.filters.splice(thisColl.filters.indexOf(thisFilter.value, 1));
      } else {
        thisColl.filters.push(thisFilter.value);
      }
    }

    hideBooks() {
      const thisColl = this;
      for (let book of thisColl.data.books) {
        let bookImage = book.element.querySelector(select.bookImage);
        if (bookImage.classList.contains(classNames.book.imageHidden)) {
          bookImage.classList.remove(classNames.book.imageHidden);
        }
        console.log(book.details);
        for (let filter of thisColl.filters) {
          if (!book.details[filter] && !bookImage.classList.contains(classNames.book.imageHidden)) {
            bookImage.classList.add(classNames.book.imageHidden);
            console.log(book.details, filter);
            break;
          }
        }
      }
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

    addToFavorites(event) {
      const thisColl = this;
      const thisBook = event.target.offsetParent;
      if (thisBook.classList.contains(classNames.book.image)) {
        if (thisColl.favoriteBooks.includes(thisBook.getAttribute('data-id'))) {
          thisBook.classList.remove(classNames.book.favorite);
          thisColl.favoriteBooks.splice(thisColl.favoriteBooks.indexOf(thisBook.getAttribute('data-id')), 1);
        } else {
          thisBook.classList.add(classNames.book.favorite);
          thisColl.favoriteBooks.push(thisBook.getAttribute('data-id'));
        }
      }
    }

    renderCollection() {
      const thisColl = this;
      /* find collection container */
      const collectionContainer = document.querySelector(select.booksList);
      for (let bookData of thisColl.data.books) {
        bookData.ratingBgc = thisColl.determineRatingBgc(bookData.rating);
        bookData.ratingWidth = bookData.rating * 10;
        /* generate HTML based on temlate */
        const generatedHTML = templates.bookItem(bookData);
        /* create element using utils.createElementFromHTML */
        bookData.element = utils.createDOMFromHTML(generatedHTML);
        /* add element to collection */
        collectionContainer.appendChild(bookData.element);
      }
    }
  }

  const app = new BooksCollection();
  app;
}
