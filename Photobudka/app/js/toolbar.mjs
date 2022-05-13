export class Toolbar {
  app;
  delayInput;
  shotButton;
  burstShotButton;
  clearButton;

  constructor(app) {
    this.app = app;
    this.InitializeButtonsAndInputDelay();
    this.bindListeners();
    Toolbar._shot = this._shot.bind(this);
    Toolbar._burstShot = this._burstShot.bind(this);
    Toolbar._clear = this._clear.bind(this);
    Toolbar._setDelay = this._setDelay.bind(this);
  }

  InitializeButtonsAndInputDelay() {
    this.shotButton = document.getElementsByName("shot")[0];
    this.burstShotButton = document.getElementsByName("burst_shot")[0];
    this.clearButton = document.getElementsByName("clear")[0];
    this.delayInput = document.getElementsByName("delay")[0];
  }

  bindListeners() {
    this.shotButton.addEventListener('click', function (ev) { ev.preventDefault(); Toolbar._shot(); }, false)
    this.burstShotButton.addEventListener('click', function (ev) { ev.preventDefault(); Toolbar._burstShot(); }, false)
    this.clearButton.addEventListener('click', function (ev) { ev.preventDefault(); Toolbar._clear(); }, false)
  }

  _clear() {
    this.app.clear();
  }

  _shot() {
    Toolbar._setDelay();
    this.app.shot();
  }

  _burstShot() {
    Toolbar._setDelay();
    this.app.burstShot();
  }

  _setDelay() {
    this.app.setDelay(this.delayInput.value);
  }

}