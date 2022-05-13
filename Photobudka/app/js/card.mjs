
export class Card {
  app;
  maxNumberPictures = 3;
  currentNumberPictures = 0;
  photoFirst;
  photoSecond;
  photoThird;

  constructor(app) {
    this.app = app;
    this.InitializePictures();
    Card.getEmptyImageElement = this.getEmptyImageElement.bind(this);
  }

  InitializePictures() {
    this.photoFirst = document.getElementById('photoFirst');
    this.photoSecond = document.getElementById('photoSecond');
    this.photoThird = document.getElementById('photoThird');
  }

  isFull() {
    return this.currentNumberPictures > this.maxNumberPictures;
  }

  getEmptyImageElement(data) {
    var cards = document.querySelectorAll('.card');
    cards = Array.prototype.slice.call(cards);

    for (let i = 0; i < cards.length; i++) {
      var elems = cards[i].childNodes;
      elems = Array.prototype.slice.call(elems);
      for (let j = 1; j < 6; j = j + 2) {
        if (!elems[j].hasAttribute('src')) {
          return elems[j];
        }
      }
    }
    this.app.addCard(data);
    return this.app.cards[this.app.cards.length - 1][0];
  }

  addPicture(data) {
    this.currentNumberPictures += 1;
    if (this.isFull()) {
      this.app.addCard(data);
    }

    else {
      var pictureElement = Card.getEmptyImageElement(data);
      pictureElement.setAttribute('src', data);
    }
  }
}