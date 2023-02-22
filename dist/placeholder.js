

function setText(name, phone, comment, speed) {
OriginPlaceholderName=document.getElementById("InputNameField").getAttribute("placeholder");
OriginPlaceholderPhone=document.getElementById("InputPhoneField").getAttribute("placeholder");
OriginPlaceholderComment=document.getElementById("InputCommentField").getAttribute("placeholder");
NamePattern=name;
PhonePattern=phone;
CommentePattern=comment;
  int = setInterval(ChangePlaceholder, speed);
  // e.focus();
  // e.onblur = function() {
  //   clearInterval(int)
  //  };



};
function ChangePlaceholder() {
  

  if (i < NamePattern.length) { //МЕняем Имя
    e = document.getElementById("InputNameField");
    PlaceholderName += NamePattern[i];
    e.setAttribute('placeholder', PlaceholderName); //

  
  }
  else if(i< NamePattern.length+PhonePattern.length){//Меняем телефон
    e = document.getElementById("InputPhoneField");
    PlaceholderPhone += PhonePattern[i-NamePattern.length];
    e.setAttribute('placeholder', PlaceholderPhone); // 
  
  }
  else if (i < NamePattern.length + PhonePattern.length + CommentePattern.length){//Меняем комментарий
    e = document.getElementById("InputCommentField");
    PlaceholderComment += CommentePattern[i-NamePattern.length-PhonePattern.length];
    e.setAttribute('placeholder', PlaceholderComment); // 

  
  }
  else{
    clearInterval(int);
    document.getElementById("InputNameField").setAttribute("placeholder",OriginPlaceholderName);
    document.getElementById("InputPhoneField").setAttribute("placeholder",OriginPlaceholderPhone);
    document.getElementById("InputCommentField").setAttribute("placeholder",OriginPlaceholderComment);

  }
i++;
}

let int = null; i = 0; PlaceholderName = '';
let PlaceholderPhone = "+38(0"; PlaceholderComment = "";
let OriginPlaceholderName = ''; OriginPlaceholderPhone = ""; OriginPlaceholderComment = "";
let NamePattern = "Введите"; PhonePattern = "50"; CommentePattern = "Шиномонтаж под ключ";
