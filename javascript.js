var playing=false;
var score;
var action;
var timeremaining;
var correctans;
var i;

document.getElementById("startreset").onclick=function()
{
     if(playing==true)//if we are playing
     {
      location.reload();//reload page
     }

     else//if we are not playing
     {
        playing=true;
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        show("time");//show countdown box
        timeremaining=60;
        document.getElementById("startreset").innerHTML="Reset Game";
        hide("gameover");
        startcountdown(); //function to countdown time  
        generateqa(); //generate new question and multiple answers
        
     }

}
//clicking on answer box
for(i=1;i<5;i++)
{
document.getElementById("b"+i).onclick=function()
{
if(playing == true)
{
    if(this.innerHTML == correctans)
    {
        score++;
        document.getElementById("score").innerHTML=score;
        show("correct");
        setTimeout(function()
        {
            hide("correct");
        },1000)
        hide("wrong");
        generateqa();//generate a new question for a right ans.
         
    }
    else
    {
         show("wrong");
         hide("correct");
         setTimeout(function()
         {
           hide("wrong");
         },1000)
    }
}
}
}

function startcountdown()
{   
    action=setInterval(function(){
    timeremaining-=1;
    document.getElementById("timeremainingvalue").innerHTML=timeremaining;
    if(timeremaining==0)//game over
    {
        stopcountdown();
        show("gameover");
        document.getElementById("gameover").innerHTML="<p>Game over</p><p>your score is " + score + "</p";
        hide("time");
        hide("correct");
        playing=false;
        document.getElementById("startreset").innerHTML="Start Game";
        
    }
},1000);
}

function stopcountdown()//stop counter
{
    clearInterval(action);
}

function show(Id)
{
    document.getElementById(Id).style.display="block";
}
function hide(Id)
{
    document.getElementById(Id).style.display="none";
}

function generateqa()
{
  var x= 1 + Math.round(9*Math.random());//generating a random num between 1 and 10.
  var y= 1 + Math.round(9*Math.random());
  correctans=x*y;
  document.getElementById("question").innerHTML=x + " X " + y;
  var correctposition= 1 + Math.round(3*Math.random());//choosing a random box from any of the four boxes.
  document.getElementById("b"+correctposition).innerHTML=correctans;//filling one random box with the correct ans. 
   
  //filling the other boxes with wrong ans.

  var answers=[correctans]; //contains all options

  for(i=1; i<5; i++)
  {
      if(i!=correctposition)
      {
          var wrongans;
          do
          {
            wrongans= (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
          } while(answers.indexOf(wrongans) >= 0);
            document.getElementById("b"+i).innerHTML= wrongans;
      }
 }
 }