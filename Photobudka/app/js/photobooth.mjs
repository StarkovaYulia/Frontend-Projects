import { Gallery } from "./gallery.mjs";
import { Toolbar } from "./toolbar.mjs";

export class Photobooth {
  root;
  video;
  canvas;
  delay;
  _toolbar;
  _gallery;
  width = 240;
  height = 180;

  constructor(rootElement) {
    window.__photoboth = this;
    this.root = rootElement;

    this._toolbar = new Toolbar(this);
    this._gallery = new Gallery(this);
    Photobooth._shot = this._shot.bind(this);
    Photobooth.shot = this.shot.bind(this);
    Photobooth.disableShotButtons = this.disableShotButtons.bind(this);
    Photobooth.ableShotButtons = this.ableShotButtons.bind(this);
    this.initCamera();
  }

  initCamera() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });
  }

  disableShotButtons() {
    document.getElementsByName("shot")[0].disabled = true;
    document.getElementsByName("burst_shot")[0].disabled = true;
  }

  ableShotButtons() {
    document.getElementsByName("shot")[0].disabled = false;
    document.getElementsByName("burst_shot")[0].disabled = false;
  }

  clear() {
    console.log("clear");
    var div = document.getElementsByClassName("gallery")[0];
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    this._gallery.cards = [];
  }

  _shot() {
    var context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    context.drawImage(this.video, 0, 0, this.width, this.height);
    var data = this.canvas.toDataURL('image/png');
    this._gallery.addPicture(data);
  }

  shot() {
    console.log("shot");
    Photobooth.disableShotButtons();
    setTimeout(function () { one(); }, this.delay);

    function one() {
      Photobooth._shot();
      Photobooth.ableShotButtons();
    }
  }

  burstShot() {
    console.log("burstShot");
    Photobooth.disableShotButtons();
    setTimeout(function () { firstshot(); }, this.delay);

    function firstshot() {
      Photobooth._shot();
      setTimeout(function () { secondShot(); }, 1000);
    }

    function secondShot() {
      Photobooth._shot();
      setTimeout(function () { thirdShot(); }, 1000);
    }

    function thirdShot() {
      Photobooth._shot();
      Photobooth.ableShotButtons();
    }
  }

  setDelay(delay) {
    this.delay = parseInt(delay, 10);
    this.delay = delay * 1000;
  }
}
