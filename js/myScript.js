/**
 * Esta función muestra un formulario de login (para fetch)
 * El botón enviar del formulario deberá invocar a la función doLogin
 * Modifica el tag div con id main en el html
 */
function showLogin(){
  var html = "<label for='userName'>Usuario: </label>"+"<input type='text' id= 'user'>";
  html+="<br><label for='userName'>Contraseña: </label>"+"<input type='text' id= 'contra'>"+"<br><input onclick='doLogin()' type='submit' value='Submit'>";
  console.log("s"+userFullName);
  document.getElementById("main").innerHTML = html;
  

}

/**
 * Esta función recolecta los valores ingresados en el formulario
 * y los envía al CGI login.pl
 * La respuesta del CGI es procesada por la función loginResponse
 */
function doLogin(){
  var usuario=document.getElementById("user").value;
  var contraseña=document.getElementById("contra").value;
  var url = "cgi-bin/login.pl?user="+usuario+"&password="+contraseña;
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(myXML);
      loginResponse(myXML);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}
/**
 * Esta función recibe una respuesta en un objeto XML
 * Si la respuesta es correcta, recolecta los datos del objeto XML
 * e inicializa la variable userFullName y userKey (e usuario)
 * termina invocando a la funcion showLoggedIn.
 * Si la respuesta es incorrecta, borra los datos del formulario html
 * indicando que los datos de usuario y contraseña no coinciden.
 */
function loginResponse(respuesta){
  var contenido=respuesta.getElementsByTagName("user")[0].textContent;
  if(contenido==""){
    document.getElementById("contra").value="";
    document.getElementById("user").value="";
    window.alert("La contraseña no coincide");
  }
  else{
   var nombres=respuesta.getElementsByTagName("user")[0].getElementsByTagName("firstName")[0].textContent;
   var apellidos=respuesta.getElementsByTagName("user")[0].getElementsByTagName("lastName")[0].textContent;
   var owner=respuesta.getElementsByTagName("user")[0].getElementsByTagName("owner")[0].textContent;
    console.log("nombre: "+nombres+" apellidos: "+apellidos);
    userFullName = nombres+' '+apellidos;
    userKey = owner;
    showLoggedIn();
  }

}
/**
 * esta función usa la variable userFullName, para actualizar el
 * tag con id userName en el HTML
 * termina invocando a las functiones showWelcome y showMenuUserLogged
 */
function showLoggedIn(){
  document.getElementById("userName").innerHTML =  userFullName;  
  showWelcome();
  showMenuUserLogged();

}


/**
 * Esta función crea el formulario para el registro de nuevos usuarios
 * el fomulario se mostrará en tag div con id main.
 * La acción al presionar el bontón de Registrar será invocar a la 
 * función doCreateAccount
 * */
function showCreateAccount(){
  var html = "<label for='userName'>Usuario: </label>"+"<input type='text' id= 'user'>";
  html += "<br><label for='password'>Contraseña: </label>"+"<input type='text' id='contra''>";
  html += "<br><label for='nombres'>Nombres: </label>"+"<input type='text' id= 'nombres'>";
  html += "<br><label for='apellidos'>Apellidos: </label>"+"<input type='text' id= 'apellidos'>";
  html+="<br><input onclick='doCreateAccount()' type='submit' value='Submit'>";
  document.getElementById("main").innerHTML = html;
}

/* Esta función extraerá los datos ingresados en el formulario de
 * registro de nuevos usuarios e invocará al CGI register.pl
 * la respuesta de este CGI será procesada por loginResponse.
 */
function doCreateAccount(){
  var usuario=document.getElementById("user").value;
  var contraseña=document.getElementById("contra").value;
  var nombres=document.getElementById("nombres").value;
  var apellidos=document.getElementById("apellidos").value;
  console.log("usuario: "+usuario+" contra: "+contraseña+"nombres: "+nombres+"apellidos: "+apellidos);
  var url = "cgi-bin/register.pl?user="+usuario+"&password="+contraseña+"&nombres="+nombres+"&apellidos="+apellidos;
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(myXML);
      loginResponse(myXML);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}

/*
 * Esta función invocará al CGI list.pl usando el nombre de usuario 
 * almacenado en la variable userKey
 * La respuesta del CGI debe ser procesada por showList
 */
function doList(){
  var url = "cgi-bin/lista.pl?owner="+userKey;
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(myXML);
      showList(myXML);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });

}

/**
 * Esta función recibe un objeto XML con la lista de artículos de un usuario
 * y la muestra incluyendo:
 * - Un botón para ver su contenido, que invoca a doView.
 * - Un botón para borrarla, que invoca a doDelete.
 * - Un botón para editarla, que invoca a doEdit.
 * En caso de que lista de páginas esté vacia, deberá mostrar un mensaje
 * indicándolo.
 */
function showList(respuesta){
  var contenido=respuesta.getElementsByTagName("articles")[0].textContent;
  if(contenido==""){
    window.alert("No hay contenido");
  }
  else{
    var arreglo=respuesta.getElementsByTagName("article");
    var html="";
    for(let i=0;i<arreglo.length;i++){
      var title=arreglo[i].getElementsByTagName("title")[0].textContent;
      html+=title+"<input onclick=\"doView('"+title+"')\" type='submit' value='View'>"+"<input onclick=\"doDelete('"+title+"')\" type='submit' value='Delete'>"+"<input onclick=\"doEdit('"+title+"')\" type='submit' value='Edit'><br>";
    }
    document.getElementById("main").innerHTML = html;
  }
}

/**
 * Esta función deberá generar un formulario para la creación de un nuevo
 * artículo, el formulario deberá tener dos botones
 * - Enviar, que invoca a doNew 
 * - Cancelar, que invoca doList
 */
function showNew(){
  var html = "<br><label for='password'>title: </label>"+"<input type='text' id='titulo''>";
  html += "<br><label for='nombres'>texto: </label>"+ "<textarea id='texto'></textarea> ";
  html+="<br><input onclick='doNew()' type='submit' value='Enviar'>";
  html+="<br><input onclick='doList()' type='submit' value='Cancelar'>";
  document.getElementById("main").innerHTML = html;
}

/*
 * Esta función invocará new.pl para resgitrar un nuevo artículo
 * los datos deberán ser extraidos del propio formulario
 * La acción de respuesta al CGI deberá ser una llamada a la 
 * función responseNew
 */
function doNew(){
  var titulo=document.getElementById("titulo").value;
  var texto=document.getElementById("texto").value;
  console.log("texto: "+texto);
  var url = "cgi-bin/nuevo.pl?owner="+userKey+"&title="+titulo+"&text="+texto;
  console.log("url: "+url);
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(myXML);
      responseNew(myXML);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}

/*
 * Esta función obtiene los datos del artículo que se envían como respuesta
 * desde el CGI new.pl y los muestra en el HTML o un mensaje de error si
 * correspondiera
 */
function responseNew(response){
  var contenido=response.getElementsByTagName("article")[0].textContent;
  if(contenido==""){
    console.log("No hay contenido");
  }
  else{
    var article=response.getElementsByTagName("article")[0];
    var html=article.getElementsByTagName("title")[0].textContent+"<br>"+article.getElementsByTagName("text")[0].textContent; 
    document.getElementById("main").innerHTML = html;
  }
}

/*
 * Esta función invoca al CGI view.pl, la respuesta del CGI debe ser
 * atendida por responseView
 */
function doView(title){
  console.log("user: "+userKey);
  console.log("title: "+title);
  var url = "cgi-bin/ver.pl?owner="+userKey+"&title="+title;
  var promise = fetch(url);
  var myHTML;
  promise.then(response => response.text())
    .then(data =>{
      console.log(data);
      responseView(data);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}

/*
 * Esta función muestra la respuesta del cgi view.pl en el HTML o 
 * un mensaje de error en caso de algún problema.
 */
function responseView(response){
   document.getElementById("main").innerHTML = response;
}

/*
 * Esta función invoca al CGI delete.pl recibe los datos del artículo a 
 * borrar como argumentos, la respuesta del CGI debe ser atendida por doList
 */
function doDelete(title){
  console.log("user: "+userKey);
  console.log("title: "+title);
  var url = "cgi-bin/delete.pl?owner="+userKey+"&title="+title;
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      doList();
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}

/*
 * Esta función recibe los datos del articulo a editar e invoca al cgi
 * article.pl la respuesta del CGI es procesada por responseEdit
 */
function doEdit(title){
  var url = "cgi-bin/article.pl?owner="+userKey+"&title="+title;
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      responseEdit(myXML);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}

/*
 * Esta función recibe la respuesta del CGI data.pl y muestra el formulario 
 * de edición con los datos llenos y dos botones:
 * - Actualizar que invoca a doUpdate
 * - Cancelar que invoca a doList
 */
function responseEdit(xml){
  var contenido=xml.getElementsByTagName("article")[0].textContent;
  if(contenido==""){
    console.log("No hay contenido");
  }
  else{
    var arreglo=xml.getElementsByTagName("article");
    var title=arreglo[0].getElementsByTagName("title")[0].textContent;
    var text=arreglo[0].getElementsByTagName("text")[0].textContent;
    var html = "<br><label for='nombres'>texto: </label>"+ "<textarea id='texto'>"+text+"</textarea> ";
  html+="<br><input onclick=\""+"doUpdate('"+title+"')\" type='submit' value='Enviar'>";
  html+="<br><input onclick=doList() type='submit' value='Cancelar'>";
    document.getElementById("main").innerHTML = html;
  }
}
/*
 * Esta función recibe el título del artículo y con la variable userKey y 
 * lo llenado en el formulario, invoca a update.pl
 * La respuesta del CGI debe ser atendida por responseNew
 */
function doUpdate(title){
  var texto=document.getElementById("texto").value;
  var url = "cgi-bin/update.pl?title="+title+"&text="+texto+"&owner="+userKey;
  var promise = fetch(url);
  var myXML;
  promise.then(response => response.text())
    .then(data =>{
      myXML = (new window.DOMParser()).parseFromString(data, "text/xml");
      responseNew(myXML);
    }).catch(error =>{
      console.log("para por");
      console.log("Error: ",error);
    });
}

