const game = Vue.createApp({
  data() {
    return {
      images: ['./imgs/1.jpg', './imgs/screenshot.2.jpg', './imgs/screenshot.3.jpg', './imgs/screenshot.4.jpg', './imgs/screenshot.5.jpg', './imgs/screenshot.6.jpg', './imgs/screenshot.7.jpg', './imgs/screenshot.8.jpg', './imgs/screenshot.9.jpg', './imgs/screenshot.10.jpg', './imgs/screenshot.11.jpg', './imgs/screenshot.12.jpg', './imgs/screenshot.13.jpg', './imgs/screenshot.14.jpg', './imgs/screenshot.15.jpg', './imgs/screenshot.16.jpg', './imgs/screenshot.17.jpg', './imgs/screenshot.18.jpg', './imgs/screenshot.19.jpg', './imgs/screenshot.20.jpg', './imgs/screenshot.21.jpg', './imgs/screenshot.22.jpg', './imgs/screenshot.23.jpg', './imgs/screenshot.24.jpg', './imgs/screenshot.25.jpg', './imgs/screenshot.26.jpg'],
      image: '',
      puzzle: [
        {
          order: 1,
          empty: false,
          id: 1,
        },
        {
          order: 2,
          empty: false,
          id: 2,
        },
        {
          order: 3,
          empty: false,
          id: 3,
        },
        {
          order: 4,
          empty: false,
          id: 4,
        },
        {
          order: 5,
          empty: false,
          id: 5,
        },
        {
          order: 6,
          empty: false,
          id: 6,
        },
        {
          order: 7,
          empty: false,
          id: 7,
        },
        {
          order: 8,
          empty: false,
          id: 8,
        },
        {
          order: 9,
          empty: true,
          id: 9,
        },
      ],
      clickedX: "",
      clickedY: "",
      unclickedX: "",
      unclickedY: "",
      distanceX: "",
      distanceY: "",
      movedElementOrder: "",
      oldMainOrder: "",
      oldSecondOrder: "",
      goodItemsCounter: 0,
      gameStatus: "off",
      newRandomOrders: [],
      shuffledOrders: [],
      shuffeledElementA: '',
      shuffeledElementB: '',
      preview: false,
    };
  },
  watch: {
    distanceX() {
      if (this.distanceX > this.distanceY) {
        if (this.clickedX < this.unclickedX) {
          this.moveElementRight();
        } else {
          this.moveElementLeft();
        }
      } else {
        if (this.clickedY < this.unclickedY) {
          this.moveElementDown();
        } else {
          this.moveElementUp();
        }
      }
    },
  },
  computed: {
    imgView() {
      return { active: this.gameStatus == "started", el: true }
      
    },
    boardView() {
        return { active: this.gameStatus == "started", playboard: true, moveRight: true }
    },
    buttonTxt() {
      if (this.gameStatus == "off") {
        return "Start the game!";
      } else if (this.gameStatus == "started") {
        return "Restart...";
      } else {
        return "Try again!";
      }
    },
    wonTxt() {
      return 'You finally won!<br>Pet congrats!'
    },
    previewSvg() {
      if (this.preview == true) {
        return (`
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_105_2)">
        <path d="M29.8846 14.4808C27.1731 9.00008 21.5192 5.19238 15 5.19238C8.48079 5.19238 2.82694 9.00008 0.115403 14.4808C-0.0576735 14.827 -0.0576735 15.2308 0.115403 15.5193C2.82694 21.0001 8.48079 24.8078 15 24.8078C21.5192 24.8078 27.1731 21.0001 29.8846 15.5193C30.0577 15.1732 30.0577 14.827 29.8846 14.4808ZM15 21.3462C11.4808 21.3462 8.65386 18.5193 8.65386 15.0001C8.65386 11.4808 11.4808 8.65392 15 8.65392C18.5192 8.65392 21.3462 11.4808 21.3462 15.0001C21.3462 18.5193 18.5192 21.3462 15 21.3462Z" fill="#D10074"/>
        <path d="M15 10.9617C12.75 10.9617 10.9615 12.7501 10.9615 15.0001C10.9615 17.2501 12.75 19.0386 15 19.0386C17.25 19.0386 19.0385 17.2501 19.0385 15.0001C19.0385 12.7501 17.25 10.9617 15 10.9617Z" fill="#D10074"/>
        </g>
        <defs>
        <clipPath id="clip0_105_2">
        <rect width="30" height="30" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        `)
      } else {
        return (`
        <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
        <path d="M6 16C6.63472 17.2193 7.59646 18.3504 8.82276 19.3554C12.261 22.1733 17.779 24 24 24C30.221 24 35.739 22.1733 39.1772 19.3554C40.4035 18.3504 41.3653 17.2193 42 16" stroke="#D10074" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M28.9777 24L31.0482 31.7274" stroke="#D10074" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M37.3535 21.3536L43.0104 27.0104" stroke="#D10074" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.99998 27.0104L10.6568 21.3536" stroke="#D10074" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.9276 31.7274L18.9982 24" stroke="#D10074" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`)
      }
    }
  },
  methods: {
    reloadImage() {
      this.image = this.images[Math.floor(Math.random() * (this.images.length - 1))]
      this.gameStatus = "off"
      for (let index = 0; index < this.puzzle.length; index++) {
        this.puzzle[index].order = index + 1        
      }
      this.shuffeledElementA = 9

    },
    clickOnDiv(event) {
      if (this.gameStatus == "started") {
        this.clickedX = event.clientX;
        this.clickedY = event.clientY;
        this.movedElementOrder = event.target.getAttribute("data-order");
      }
    },
    calculateDistances(event) {
      if (this.gameStatus == "started") {
        this.unclickedX = event.clientX;
        this.unclickedY = event.clientY;
        this.distanceX = Math.abs(this.clickedX - this.unclickedX);
        this.distanceY = Math.abs(this.clickedY - this.unclickedY);
      }
    },
    clickOnDivMobile(event) {
      if (this.gameStatus == "started") {
        this.clickedX = event.touches[0].clientX;
        this.clickedY = event.touches[0].clientY;
        this.movedElementOrder = event.target.getAttribute("data-order");
      }
    },
    calculateDistancesMobile(event) {
      if (this.gameStatus == "started") {
        this.unclickedX = event.changedTouches[0].clientX;
        this.unclickedY = event.changedTouches[0].clientY;
        this.distanceX = Math.abs(this.clickedX - this.unclickedX);
        this.distanceY = Math.abs(this.clickedY - this.unclickedY);
      }
    },
    moveElementRight() {
      if (Number(this.movedElementOrder) + 1 < 1 || Number(this.movedElementOrder) + 1 > 9) {
        return
      }

      let mainIndex = this.puzzle.findIndex(
        (item) => item.order == this.movedElementOrder
      );
      let main = this.puzzle[mainIndex];
      let secondIndex = this.puzzle.findIndex(
        (item) => item.order == Number(this.movedElementOrder) + 1
      );
      let second = this.puzzle[secondIndex];

      let mainDataOrder = main.order;
      let secondDataOrder;
      if (second.order) {
        secondDataOrder = second.order;
      }
      if (
        second &&
        second.empty &&
        (mainDataOrder == 1 ||
          mainDataOrder == 2 ||
          mainDataOrder == 4 ||
          mainDataOrder == 5 ||
          mainDataOrder == 7 ||
          mainDataOrder == 8)
      ) {
        this.oldMainOrder = mainDataOrder;
        this.oldSecondOrder = secondDataOrder;
        this.puzzle[mainIndex].order = this.oldSecondOrder;
        this.puzzle[secondIndex].order = this.oldMainOrder;
      }

      this.checkMatch();
    },
    moveElementLeft() {
      if (Number(this.movedElementOrder) - 1 < 1 || Number(this.movedElementOrder) - 1 > 9) {
        return
      }
      let mainIndex = this.puzzle.findIndex(
        (item) => item.order == this.movedElementOrder
      );
      let main = this.puzzle[mainIndex];
      let secondIndex = this.puzzle.findIndex(
        (item) => item.order == Number(this.movedElementOrder) - 1
      );
      let second = this.puzzle[secondIndex];

      let mainDataOrder = main.order;
      let secondDataOrder;
      if (second.order) {
      secondDataOrder = second.order;
      }
      if (
        second &&
        second.empty &&
        (mainDataOrder == 2 ||
          mainDataOrder == 3 ||
          mainDataOrder == 5 ||
          mainDataOrder == 6 ||
          mainDataOrder == 8 ||
          mainDataOrder == 9)
      ) {
        this.oldMainOrder = mainDataOrder;
        this.oldSecondOrder = secondDataOrder;
        this.puzzle[mainIndex].order = this.oldSecondOrder;
        this.puzzle[secondIndex].order = this.oldMainOrder;
      }

      this.checkMatch();
    },
    moveElementDown() {
      if (Number(this.movedElementOrder) + 3 < 1 || Number(this.movedElementOrder) + 3 > 9) {
        return
      }
      let mainIndex = this.puzzle.findIndex(
        (item) => item.order == this.movedElementOrder
      );
      let main = this.puzzle[mainIndex];
      let secondIndex = this.puzzle.findIndex(
        (item) => item.order == Number(this.movedElementOrder) + 3
      );
      let second = this.puzzle[secondIndex];

      let mainDataOrder = main.order;
      let secondDataOrder;
      if (second.order) {
        secondDataOrder = second.order;
      }

      if (
        second &&
        second.empty &&
        (mainDataOrder == 1 ||
          mainDataOrder == 2 ||
          mainDataOrder == 3 ||
          mainDataOrder == 4 ||
          mainDataOrder == 5 ||
          mainDataOrder == 6)
      ) {
        this.oldMainOrder = mainDataOrder;
        this.oldSecondOrder = secondDataOrder;
        this.puzzle[mainIndex].order = this.oldSecondOrder;
        this.puzzle[secondIndex].order = this.oldMainOrder;
      }

      this.checkMatch();
    },
    moveElementUp() {
      if (Number(this.movedElementOrder) - 3 < 1 || Number(this.movedElementOrder) - 3 > 9) {
        return
      }

      let mainIndex = this.puzzle.findIndex(
        (item) => item.order == this.movedElementOrder
      );
      let main = this.puzzle[mainIndex];
      
      let secondIndex = this.puzzle.findIndex(
        (item) => item.order == Number(this.movedElementOrder) - 3
      );
      let second = this.puzzle[secondIndex];

      let mainDataOrder = main.order;
      let secondDataOrder;
      if (second.order) {
      secondDataOrder = second.order;
      }

      if (
        second &&
        second.empty &&
        (mainDataOrder == 4 ||
          mainDataOrder == 5 ||
          mainDataOrder == 6 ||
          mainDataOrder == 7 ||
          mainDataOrder == 8 ||
          mainDataOrder == 9)
      ) {
        this.oldMainOrder = mainDataOrder;
        this.oldSecondOrder = secondDataOrder;
        this.puzzle[mainIndex].order = this.oldSecondOrder;
        this.puzzle[secondIndex].order = this.oldMainOrder;
      }

      this.checkMatch();
    },
    checkMatch() {
      for (let index = 0; index < this.puzzle.length; index++) {
        if (index + 1 == this.puzzle[index].order) {
          this.goodItemsCounter++;
        }
      }
      if (this.goodItemsCounter == 9) {
        this.gameStatus = "won";
        return;
      } else {
        this.goodItemsCounter = 0;
      }
    },
    gameStart() {
      console.log('good' + this.goodItemsCounter);
      if (this.gameStatus == "started" || this.gameStatus == "won") {
        this.shuffeledElementA = this.puzzle[8].order;
      }
        this.gameStatus = "started";
      console.log(this.gameStatus)
      console.log(this.shuffeledElementA)

      for (let index = 0; index < 40; index++) {
        if (this.shuffeledElementA == '') {
          this.shuffledOrders = [6, 8]
        } else {
          if (this.shuffeledElementA == 9) {
            this.shuffledOrders = [6, 8]
          } else if (this.shuffeledElementA == 8) {
            this.shuffledOrders = [5, 7, 9]
          } else if (this.shuffeledElementA == 7) {
            this.shuffledOrders = [4, 8]
          } else if (this.shuffeledElementA == 6) {
            this.shuffledOrders = [3, 5, 9]
          } else if (this.shuffeledElementA == 5) {
            this.shuffledOrders = [2, 4, 6, 8]
          } else if (this.shuffeledElementA == 4) {
            this.shuffledOrders = [1, 5, 7]
          } else if (this.shuffeledElementA == 3) {
            this.shuffledOrders = [2, 6]
          } else if (this.shuffeledElementA == 2) {
            this.shuffledOrders = [1, 3, 5]
          } else if (this.shuffeledElementA == 1) {
            this.shuffledOrders = [2, 4]
          }
        }
        this.shuffle()
      }
    },
    shuffle() {
      let randomIndex = Math.floor(Math.random() * this.shuffledOrders.length)
      let newOrder = this.shuffledOrders[randomIndex]

      if (this.shuffeledElementA == '') {
        this.shuffeledElementA = this.puzzle[8].order;
      }

      let shuffeledElementBID = this.puzzle.findIndex(
        (item) => item.order == newOrder
      );
      this.shuffeledElementB = this.puzzle[shuffeledElementBID].order;

      let aId = this.puzzle.findIndex(
        (item) => item.order == this.shuffeledElementA
      );
      let bId = this.puzzle.findIndex(
        (item) => item.order == this.shuffeledElementB
      );
      console.log(this.shuffeledElementA);
      console.log(this.shuffeledElementB);
      this.puzzle[aId].order = this.shuffeledElementB
      this.puzzle[bId].order = this.shuffeledElementA
      
      this.shuffeledElementA = this.shuffeledElementB
      this.shuffeledElementB = ''
      console.log(this.shuffeledElementA);
      console.log(this.shuffeledElementB);

    },
    changePreview() {
      this.preview = !this.preview
    }
  },
  created() {
    this.image = this.images[Math.floor(Math.random() * (this.images.length - 1))]
  }
});

game.mount("#app");
