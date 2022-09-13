document.addEventListener('DOMContentLoaded', function(){  //lo utilizamos para que el script se cargue despues de cargar todo el dom

  //obtenemos los elementos por id
  let form=document.getElementById('form1')
  let Evento=document.getElementById('paso1')
  let Fecha=document.getElementById('paso2');    
  
  //no dejamos que se vean el boton volver ni el head de la tabla
    document.getElementById('bt2').style.display = 'none';
    document.getElementById('tablaJs').style.display = 'none';
  //agregamos addEventListener al precionar submit del formulario  
    form.addEventListener('submit',(e)=>{
      //desabilitamos que la pagina se refresque despues de apretar submit
      e.preventDefault();
      //evaluamos que las casillas del formulario no esten vacias
      if(Evento.value ==='' || Fecha.value===''){
        //alerta 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Olvidaste rellenar todo!',
        })
        //caso contrario de que no este vacia
        //ahhhhhhhhhhhhhhhhhh
      }else{
        //entramos en fetch para poder buscar que la fecha del formulario este la API
        //utilizamos una ruta alternativa para simular una API      
        fetch('data.json')
               .then((resp)=>resp.json())
               .then((data)=>{ 
                //no dejamos que se vea el boton enviar(submit) y dejamos que el head de la tabla se vea
                document.getElementById('bt1').style.display = 'none';
                document.getElementById('tablaJs').style.display = '';
                //con filter buscamos que la fecha se encuentre en data.json
                let fechaElegida= data.filter( x => x.libre.includes (Fecha.value)); 
                          
                //validamos que fechaElegida sea distinta de cero, esto signiifca que se haya encontrado al menos una fecha que coincida con la fecha puesta por el usuario
                if(fechaElegida == fechaElegida.length==0){
                //alerta 
                  Swal.fire({
                  icon: 'success',
                  title: 'Que suerte tienes!',
                    text: 'encontramos un lugar perfecto para ti!',
                  })
                  //obtenemos por id nuestra tabla
                  let tabla  = document.getElementById('tablaJs');
                  //creamos el cuerpo de nuestra tabla
                  let cuerpoTabla  = document.createElement('tbody');
                  //creamos un forEach que por cada elemento de la variable fechaElegida nos cree
                  fechaElegida.forEach(fecha =>{
                    //table rows
                    let fila = document.createElement('tr');
                    //luego que nos cree table data                    
                    let td = document.createElement('td');
                    //que les agrege un texto que es el nombre de la empresa que coincide con la fecha que puso el usuario
                    td.innerText=fecha.emp;
                    //lo anida a la fila y lo pone por debajo 
                    fila.appendChild(td);
                    //repite mismo procedimiento de arriba pero agregando texto de las fechas libres
                    td = document.createElement('td');
                    td.innerText=fecha.libre;
                    fila.appendChild(td)
                    //repite mismo procedimiento de arriba pero agregando texto de las los servicios o ventajas que obtenemos de cada empresa
                    td = document.createElement('td');
                    td.innerText=fecha.ventajas;
                    fila.appendChild(td);
                    
                    
                    cuerpoTabla.appendChild(fila);
                  });
                  //mostramos nuestra tabla
                  tabla.appendChild(cuerpoTabla);
                  
                 
                  //permitimos que se vea el bton volver que nos va a permitir refrescar la pagina, para hacer otra busqueda
                  document.getElementById('bt2').style.display = '';
                  
                }else{
                  //caso contrario que no se alla encontrado una fecha que coincida con la fecha pedida por el usuario nos salta una alerta
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No encontramos un lugar para esa fecha 😥, intente otra fecha',
                  })  
                  //permitimos que se vea el bton volver que nos va a permitir refrescar la pagina, para hacer otra busqueda 
                  document.getElementById('bt2').style.display = '';   
                  //no nos deja ver el head de la tabla
                  document.getElementById('tablaJs').style.display = 'none';   
                }
                             })
        
       
      }})
      //declaramos el boton volver para refrescar la pagina, para volver a hacer otra busqueda
      let volver = document.getElementById('volver');
      volver.addEventListener('click',v=>{
        
        location.reload();
      })
    });
    