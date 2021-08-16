class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements

    question.hide();

    background("lightblue");


    textSize(26)
    fill("black")
    text("Quiz Score", 425, 60)
    
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){

      textSize(22)
      fill("black")
      text("Contestant who answered correctly will be highlighted in green", 100, 220)
      

      var ypos = 240

      //Name1 - 2  --> ypos = 240
      //Name2 - 4  --> ypos = 275


      for( var plr in allContestants){

        var correct = "2"

        if( correct === allContestants[plr].answer){
          fill("green")
        }
        else{
          fill("red")
        }

        ypos += 35
        textSize(24)
        text( allContestants[plr].name + "  :  " + allContestants[plr].answer , 300, ypos )


      }
    }

   
  }

}
