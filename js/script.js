$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.SearchItems').css("display","none");
  $('#photoSearch').css("display", "none");
  $('#choice').css("display", "none");
});

const APIkey = "545OCT9ClIpYyHbk00FH1CWx8FEKKZVAl5dILfMW";

//localStorage
let SearchItems = [];

const onClick = function inputClick(){
  $('#choice').css("display", "none");
  document.getElementById("images").checked = false;
  document.getElementById("videos").checked = false;
  document.getElementById("sounds").checked = false;
}

//INPUT DE RECHERCHE
$( "#search" ).keydown(function( event ) {
  if ( event.which == 13 ) {
    event.preventDefault();
    const resultSearch = $('#search').val();
    $('html, body').animate({
        scrollTop: $(".imgResult").offset().top
    }, 2000);
    resultat(resultSearch);
    $('#choice').css("display", "flex");
    SearchItems.push(resultSearch);
    localStorage.setItem("Search", JSON.stringify(SearchItems));
    $('.SearchItems').css("display","block");
    $('.SearchItems').html("Vous avez recherchez : " + localStorage.getItem("Search").replace(/[\"\[\]]/g,""));
    $('.imgResult').html("<ul></ul>");
  }
  if ($('#search').val() == "") {
    $('.SearchItems').css("display","none");
    //$('#photoMars').css("display", "block");
    $('#photoSearch').css("display", "none");
  }else {
    $('.SearchItems').css("direcherchesplay","block");
    //$('#photoMars').css("display", "none");
    $('#photoSearch').css("display", "block");
    $('.result').css("display", "block");
  }
});

// RESULTAT DE RECHERCHE

let RegexJpg = new RegExp('[^*]jpg$');
let Regexmp3 = new RegExp('[^*]mp3$');
let Regexmp4 = new RegExp('[^*]mp4$');

const resultat = function showCollection(resultSearch){
  $('#images').off("change");
  $('#videos').off("change");
  $('#sounds').off("change");
  $('.materialboxed').materialbox();
  let Chargement;
  Chargement = true;
  return new Promise(function(resolve, reject) {
  if (Chargement) {
    $.get(`https://images-api.nasa.gov/search?q=${resultSearch}`, function(data){
      let resultats = data.collection.items;
        resultats.forEach(resultat => {
          $.get(`${resultat.href}`, function(collection){
            collection.forEach(OneCollection => {
                $('#images').on("change",function()
                  {
                    if(this.checked != true){
                        $('.imgResult').html("<ul></ul>");
                      }
                     else{
                       if (OneCollection.match(RegexJpg) != null || undefined) {
                         $('.imgResult ul').append("<li><a href="+ OneCollection +" class='materialboxed' target='_blank'><img src=" + OneCollection + " ></a></li>");
                       }
                     }
                  });
                  $('#videos').on("change",function()
                    {
                      if(this.checked != true){
                          $('.imgResult').html("<ul></ul>");
                        }
                       else{
                         if (OneCollection.match(Regexmp4) != null || undefined) {
                           $('.imgResult ul').append("<li><a href="+ OneCollection +" class='materialboxed' target='_blank'><img src=" + OneCollection + " ></a></li>");
                         }
                       }
                    });

                    $('#sounds').on("change", function()
                      {
                        if(this.checked != true){
                            $('.imgResult').html("<ul></ul>");
                          }
                         else{
                           if (OneCollection.match(Regexmp3) != null || undefined) {
                             $('.imgResult ul').append("<li><a href="+ OneCollection +" class='materialboxed' target='_blank'><img src=" + OneCollection + " ></a></li>");
                           }
                         }
                    });
            });
          })
        })
      })
      .then(function() {
          $('#loader').css('display','none');
      })
    } else {
      reject("La recherche n'abouti pas");
    }
  });
}

//
// //IMAGES ACCUEIL MARS
// const mars = function showPhotosMars(){
//   let Chargement;
//   Chargement = true;
//   return new Promise(function(resolve, reject) {
//     if (Chargement) {
//       $('.result').css("display", "none");
//       $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=545OCT9ClIpYyHbk00FH1CWx8FEKKZVAl5dILfMW`, function(data){
//         let photosMars = data.photos;
//           photosMars.forEach(photoMars => {
//             $('.img ul').append("<li><a href="+ photoMars.img_src +" target='_blank'><img src=" + photoMars.img_src + "><p>" + photoMars.earth_date + "</p><span>" + photoMars.rover.name + "</span></a></li>");
//         })
//       })
//       .then(function() {
//           $('#loader').css('display','none');
//       })
//     } else {
//       reject("Chargement de l'application impossible");
//     }
//   });
//
// }
// mars();
