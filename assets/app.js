(() => {
  const application = Stimulus.Application.start();
  application.register('slideshow', class extends Stimulus.Controller {
    static get targets() {
      return ["next", "previous", "slide"];
    }

    initialize() {
      this.showCurrentSlide();
    }

    get index() {
      return parseInt(this.data.get('index'));
    }

    set index(value) {
      this.data.set("index", value);
      this.showCurrentSlide();
    }

    get totalSlides() {
      return this.slideTargets.length;
    }

    next() {
      this.index++;
    }

    previous() {
      this.index--;
    }

    showCurrentSlide() {
      this.slideTargets.forEach((element, i) => {
        element.classList.toggle("is-hidden", this.index !== i);
      });
      if (this.index === 0) {
        this.disable(this.previousTarget);
        this.enable(this.nextTarget);
      } else if (this.index === (this.totalSlides - 1)) {
        this.disable(this.nextTarget);
        this.enable(this.previousTarget);
      } else {
        this.enable(this.nextTarget);
        this.enable(this.previousTarget);
      }
    }

    enable(element) {
      element.removeAttribute("disabled");
    }

    disable(element) {
      element.setAttribute("disabled", "disabled");
    }
  });
})();
