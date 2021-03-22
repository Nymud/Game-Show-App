//create variables
const qwerty = document.getElementById('qwerty');
const phrase= document. querySelector('#phrase ul');
let miss = 0;
let tries = 0;
let highestMissed = 5;
const ul = document.querySelector('#phrase ul')

//const tries=document.getElementsByTagName('tries')[i];
const startGame = document.querySelector('a.btn__reset');
const overlay = document.getElementById('overlay');
let phrases= ['java' , 'php' , 'ruby' , 'python' , 'react'];
let scoreboard = document.getElementById('scoreboard');
const mainHead = document.querySelector('.title');

//addEvent listener
startGame.addEventListener('click', function() {
  let letters= document.getElementsByClassName("letter");
  let space=document.getElementsByClassName("space");
  for ( let i=letters.length-1 ; i>=0 ;  i--){
    if (letters===""){
      letters.parentNode.removeChild(letters[i]);
    }
  }
  if (mainHead.textContent.toLocaleLowerCase() == "wheel of success"){
    overlay.style.display='none';
  }else{
    window.alert("Please press the rest button for you to be able to start the game again.");
  }

});

//get randomphrase array and use split method on it.
function getRandomPhrasesArray(arr){
  var PhrasesArray= arr[(Math.floor(Math.random() * arr.length))];
  var NewPhrasesArray= PhrasesArray.split();
  return NewPhrasesArray;
}

//create addPhraseToDisplay function
function  addPhrasesDisplay(arr){
  let array=arr[0].split('');
  console.log(array);
  let win=arr

  for ( i=0; i< array.length; i++){

    let list =document.createElement('li');
    list.textContent=array[i];
    phrase.appendChild(list);
    if(array[i]===' '){
      list.className='space';
    }else{
      list.className='letter';
    };
  };
};

addPhrasesDisplay(getRandomPhrasesArray(phrases));

qwerty.addEventListener('click',function(e){
  if (e.target .tagName==='BUTTON'){
    const target= e.target;
    const button=target;
    button.className += "chosen";
    button.setAttribute('disabled',true);
    const foundLetter= checkLetter(target);

    if (foundLetter===null){
      miss ++;
      if(miss >=1 && miss <= highestMissed){
        let lives=document.querySelector('.tries').firstChild;
        lives.src='./images/lostHeart.png';
        lives.parentElement.classList.add('tried');
        lives.parentElement.classList.remove('tries');
      }
    };
    checkWin();
  }
  });


//letter appears in a phrase
function checkLetter(target){
  let foundLetter= null;
  const letter=document.getElementsByClassName('letter');
  const btn=target.textContent;
  for ( let i=0; i<letter.length; i++){
    //if matches found
    if(letter[i].textContent.toLowerCase()==target.textContent.toLowerCase()){
      letter[i].classList.add('show');
      foundLetter=letter[i];
    }
  }
  return foundLetter;
};

//function used with the checkWin function
function checkWin(){
  //append winText and loseText to the mainHead

  let letterClassShow=document.querySelectorAll(".letter");
  let letterClassLetter=document.querySelectorAll('.show');


  if (letterClassShow.length===letterClassLetter.length ){
   overlay.style.display= "flex";
   overlay.className="win";
   mainHead.innerHTML = "YOU WIN!";
   appReset();
  }else if (miss===5){
    overlay.className="lose";
    mainHead.innerHTML = "YOU LOSE!";
    overlay.style.display="flex";
    appReset();
  }
}

function appReset() {
  let button = document.createElement('button');
  button.innerHTML = "Reset";
  button.id = "reset";
  button.classList.add('btn__reset');
  overlay.append(button);

  button.addEventListener('click',() => { 
    miss = 0;
    tries = 0;
    const buttonReset = document.querySelectorAll('#qwerty button');
    const correctButtons = document.querySelectorAll('.letter');
    const triesHearts = document.querySelectorAll('.tried');

    for( let i = 0; i < correctButtons.length; i++){
      correctButtons[i].remove();
    }

    for(let i = 0; i < buttonReset.length; i ++) {
      buttonReset[i].classList.remove("chosen"); 
      buttonReset[i].removeAttribute('disabled');
    }

    for(let i=0; i < triesHearts.length;i++){
      triesHearts[i].childNodes[0].src='./images/liveHeart.png';
      triesHearts[i].classList.add('tries');
      triesHearts[i].classList.remove('tried');
    }
    mainHead.innerHTML = "WHEEL OF SUCCESS";
    overlay.classList.remove("lose");
    overlay.classList.remove("win");
    overlay.classList.add("start");
    addPhrasesDisplay(getRandomPhrasesArray(phrases));
    destoryButton(button);
  });
}

function destoryButton(button){
  button.remove();
}
