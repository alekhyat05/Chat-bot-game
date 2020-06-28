const GameState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  BATHROOM: Symbol("bathroom"),
  FRIDGE: Symbol("fridge"),
  BASEMENT: Symbol("basement"),
  REVEAL: Symbol("reveal"),
  ESCAPE: Symbol("escape"),
  SOLUTION: Symbol("solution"),
  SURVIVE: Symbol("survive"),
  ENCOUNTER: Symbol("encounter"),
  FIRE: Symbol("fire"),
  WINDOW_ESCAPE: Symbol("window_escape"),
  HELP: Symbol("help"),
  END: Symbol("End"),
});

const Script = Object.freeze({
  Bathroom:
    "What are the blood stains on the door? Anne!!! It's Anne, lying dead on bath tub. Would  you CALL 911 or RUN?",
  IncorrectEntry: "Please enter a right option",
  Call: "Shoot! Phone is dead. You are hearing strange noises. RUN john",
  LightOff: "Somebody turned the lights off.",
  BasementRoom: "This door is locked too!!",
  PlaceToHide: "Oh God. I am gonna Kill you",
  Tv:
    "Tv Switches on automatically displays a message - 'I am karen. You killed me. You deserve to die!!!!'",
  GhostOrPerson:
    "It is either Karen's ghost or somebody who knows that you killed her and is here to take revenge. Do you want to HIDE or RUN away from the home?",
  FindingKaren: "John, you see Karen's ghost flying in mid-air in living room!",
  Trapped: "oh God! You are trapped in living space. All the doors are locked!",
});

module.exports = class Game {
  constructor() {
    this.stateCur = GameState.WELCOMING;
  }

  makeAMove(sInput) {
    this.nCurrent = 0;
    let aReturn = [];
    let sReply = "";
    switch (this.stateCur) {
      case GameState.WELCOMING:
        sReply =
          "Ahh! Finally home, such a tiring day. Looks like Anne is not home yet. Will you take a BATH first? Or grab something from the FRIDGE to eat. Reply with BATH or FRIDGE.";
        this.stateCur = GameState.BATHROOM;
        break;
      case GameState.BATHROOM:
        if (sInput.toLowerCase().match("bath")) {
          sReply = Script.Bathroom;
          this.stateCur = GameState.BASEMENT;
        } else if (sInput.toLowerCase().match("fridge")) {
          sReply =
            "You find a hand with a note saying 'Go to bathroom'. What would you do? Go to the BATHROOM or CALL 911";
          this.stateCur = GameState.FRIDGE;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.FRIDGE:
        if (
          sInput.toLowerCase().match("call") ||
          sInput.toLowerCase().match("911")
        ) {
          sReply = Script.Call;
          this.stateCur = GameState.BASEMENT;
        } else if (sInput.toLowerCase().match("bathroom")) {
          sReply = Script.Bathroom;
          this.stateCur = GameState.BASEMENT;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.BASEMENT:
        if (
          sInput.toLowerCase().match("call") ||
          sInput.toLowerCase().match("911")
        ) {
          sReply = Script.Call;
          this.stateCur = GameState.BASEMENT;
        } else if (sInput.toLowerCase().match("run")) {
          let messages = [
            "Shoot! The doors are locked.",
            Script.LightOff,
            "You hear strange noises from the basement. FOLLOW the sound or do you want to HIDE",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.REVEAL;
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.REVEAL:
        if (sInput.toLowerCase().match("follow")) {
          let messages = [Script.BasementRoom, Script.Tv, Script.GhostOrPerson];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.ESCAPE;
          return aReturn;
        } else if (sInput.toLowerCase().match("hide")) {
          let messages = [Script.Trapped, Script.Tv, Script.GhostOrPerson];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.ESCAPE;
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.ESCAPE:
        if (sInput.toLowerCase().match("run")) {
          aReturn.push(
            "You should get away Right Now!! Try Opening the Door! Oops its struck, Try Breaking! Enter BREAK"
          );
          this.stateCur = GameState.SOLUTION;
          return aReturn;
        } else if (sInput.toLowerCase().match("hide")) {
          let messages = [
            "You try to hide under a sofa!!",
            "You are pulled to the living Room by an invisible force!",
            Script.FindingKaren,
            "Do you want to seek FORGIVENESS or do you want to ESCAPE. Enter FORGIVE or ESCAPE",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.SURVIVE;
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.SOLUTION:
        if (sInput.toLowerCase().match("break")) {
          let messages = [
            "You are pulled to the living Room by an invisible force!",
            Script.FindingKaren,
            "Do you want to seek FORGIVENESS or do you want to ESCAPE. Enter FORGIVE or ESCAPE",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.SURVIVE;
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.SURVIVE:
        if (sInput.toLowerCase().match("forgive")) {
          let messages = [
            "John wakes up from sleep! It was all you Dream John. It felt so Real",
            "You Win!!! congrats! John is alive.",
            "Seems like Karen forgave you.",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          return aReturn;
        } else if (sInput.toLowerCase().match("escape")) {
          let messages = [
            "Karen says: There is no escape John. You deserve to die. Karen is heading towards you to kill. What would you do now?",
            "Clue: You remember that Karen is pyrophobic. So Would you want to light up FIRE or NOT?",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.FIRE;
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.FIRE:
        if (
          sInput.toLowerCase().match("fire") ||
          sInput.toLowerCase().match("yes")
        ) {
          let messages = [
            "That actually worked! Karen gets scared, Ghost throws itself away.",
            "Do you want to run to WINDOW and ESCAPE? or walk towards Karen and TAUNT.",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.WINDOW_ESCAPE;
          return aReturn;
        } else if (
          sInput.toLowerCase().match("not") ||
          sInput.toLowerCase().match("no")
        ) {
          let messages = [
            "Too Slow to think ! Ghost jumps on John and Kill him",
            "Game Over! You Loose :(",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.WINDOW_ESCAPE:
        if (
          sInput.toLowerCase().match("window") ||
          sInput.toLowerCase().match("escape")
        ) {
          let messages = [
            "A sigh of relief. You ran to the window and escaped",
            "Run to find help from somebody.",
            "You found somebody to help you. Oops! unfortunately he is turning around. May be he couldn't hear you",
            "Would you GO closer to the PERSON ? or Would you turn back to GRAB your CAR?",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.HELP;
          return aReturn;
        } else if ("taunt") {
          //Taunt condition
          let messages = [
            "Heavy Wind blows through the window. Consequently, the fire is put off! Karen Jumps on John and Kills",
            "Game Over! You Loose :(",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      case GameState.HELP:
        if (
          sInput.toLowerCase().match("go") ||
          sInput.toLowerCase().match("close") ||
          sInput.toLowerCase().match("person")
        ) {
          let messages = [
            "Surprise!! it's Karen John. She points you to window.",
            "Alas! You see your Dead Body on ground near the window. A Rod pierced your body while you jumped",
            "You always pay off for the crimes you commit.Evil Never wins",
            "Game Over! You Loose :(",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }

          this.stateCur = GameState.END;
          return aReturn;
        } else if (
          sInput.toLowerCase().match("grab") ||
          sInput.toLowerCase().match("car")
        ) {
          let messages = [
            "You turn around to get your car",
            "Alas! You see your Dead Body on ground near the window. A Rod pierced your body while you jumped",
            "You always pay off for the crimes you commit.Evil Never wins",
            "Game Over! You Loose :(",
          ];

          for (let i = 0; i < messages.length; i++) {
            aReturn.push(messages[i]);
          }
          return aReturn;
        } else {
          sReply = Script.IncorrectEntry;
        }
        break;
      // case GameState.HELP:
      //   if (sInput.toLowerCase().match("Window")) {
      //     let messages = [
      //       "You always pay off for the crimes you commit.Evil Never wins",
      //       "Game Over! You Loose :(",
      //     ];

      //     for (let i = 0; i < messages.length; i++) {
      //       aReturn.push(messages[i]);
      //     }

      //     this.stateCur = GameState.END;
      //     return aReturn;
      //   }
      //   break;
    }
    return [sReply];
  }
};
