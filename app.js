const game = Vue.createApp({
  data() {
    return {
      images: ['./imgs/1.jpg', './imgs/screenshot.2.jpg', './imgs/screenshot.3.jpg', './imgs/screenshot.4.jpg', './imgs/screenshot.5.jpg', './imgs/screenshot.6.jpg', './imgs/screenshot.7.jpg', './imgs/screenshot.8.jpg', './imgs/screenshot.9.jpg'],
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
  },
  methods: {
    reloadImage() {
      this.image = this.images[Math.floor(Math.random() * (this.images.length - 1))]
      this.gameStatus = "off"
      for (let index = 0; index < this.puzzle.length; index++) {
        this.puzzle[index].order = index + 1        
      }
      this.shuffeledElementA = 9

      console.log('reload');
      console.log('a ' + this.shuffeledElementA);

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
      console.log('start the game');

      if (this.gameStatus == "started") {
        this.shuffeledElementA = this.puzzle[8].order;
        console.log('shuffled ' + this.shuffeledElementA);
      } else {
        this.gameStatus = "started";
        console.log('started ' + this.shuffeledElementA);
      }

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

      console.log('a ' + this.shuffeledElementA);
      console.log('b ' + this.shuffeledElementB);
      this.puzzle[aId].order = this.shuffeledElementB
      this.puzzle[bId].order = this.shuffeledElementA
      
      this.shuffeledElementA = this.shuffeledElementB
      this.shuffeledElementB = ''
      console.log('a ' + this.shuffeledElementA);
      console.log('b ' + this.shuffeledElementB);

    }
  },
  created() {
    this.image = this.images[Math.floor(Math.random() * (this.images.length - 1))]
  }
});

game.mount(".game");
