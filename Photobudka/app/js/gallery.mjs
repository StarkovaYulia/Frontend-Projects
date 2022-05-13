import { Card } from "./card.mjs";

export class Gallery {
  card;
  app;
  gallery;
  template;
  _card;
  maxNumberCards = 5;
  cards = [];

  constructor(app) {
    this.app = app;
    this.InitializeGallery();
  }

  InitializeGallery() {
    this.gallery = document.getElementsByClassName("gallery")[0];
    this.template = document.querySelector('#template');
  }

  addCard(data) {
    if (this.cards.length < this.maxNumberCards) {
      var newCard = new Card(this);
      this.cards.push(newCard);
      var clone = this.template.content.cloneNode(true);
      this.gallery.appendChild(clone);
      this.cards[this.cards.length - 1].addPicture(data);
    }
  }

  addPicture(data) {

    for (let i = 0; i < this.cards.length; i++) {
      if (!this.cards[i].isFull()) {
        this.cards[i].addPicture(data);
        return;
      }
    }
    this.addCard(data);
    return;
  }

}