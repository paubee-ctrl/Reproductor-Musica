
const reproductor = document.getElementById('reproductor');
const ponerPlay = document.getElementById('btn-play');
const ponerPausa = document.getElementById('btn-pausa');
const ponerSiguiente = document.getElementById('btn-siguiente');
const elEstado = document.getElementById('estado');
const laCancion = document.getElementById('cancion');

const cancionActual = {
    nombre: '', 
    estado: false,

    play(){
       this.estado = true;
       renderPantalla(this.estado, this.nombre)
   },

   pausa(){
        this.estado = false;
        renderPantalla(this.estado, this.nombre)
   },

  async siguiente(){
          let [respuesta, datos] = await obtenerDatos()

          if(respuesta)
          {
               ponerPausa.disabled = false;
               ponerPlay.disabled = false; 
               let numeroRandom = Math.floor(Math.random() * datos.length)
               this.nombre = `${datos[numeroRandom].cancion} de ${datos[numeroRandom].artista}`
               this.estado = true;
               renderPantalla(this.estado, this.nombre) 
          }

          else{
               this.estado = false;
               renderPantalla(this.estado, datos)
          }
   }
}

async function obtenerDatos() {
     try {
          const respuesta = await fetch('./index.json');

          if(!respuesta.ok)
               throw new Error('No Carga la Música. Intenta Más Tarde.')
     
          const datos = await respuesta.json()
          return [true, datos]

     } catch (error) {
          return [false, error]
     }
}

ponerPlay.addEventListener('click', () => {
     cancionActual.play()
}) /* si colocase solamente cancionActual.play al lado de 'click' entonces solamente se pasa la función sin el objeto. This no sería el objeto canciónActual, sino ponerPlay, es decir, el botón, por lo cual this.estado cambiaría a reproduciendo pero no habría concordancia con la variable estado que está dentro del objeto. Aquí, esta es la solución, cuando se oprime el botón, la flecha ejecuta cancionActual.play() con punto, y ese punto es lo que fija el this.   */

ponerSiguiente.addEventListener('click', () => {
     cancionActual.siguiente()
})

ponerPausa.addEventListener('click', () => {
     cancionActual.pausa()
})


function renderPantalla(estado, cancionSonando){
     if(estado)
     {
          elEstado.textContent = 'Reproduciendo'
          reproductor.classList.add('sonando')
     }

     else
     {
          elEstado.textContent = 'Detenido'
          reproductor.classList.remove('sonando')
     }

     laCancion.textContent = cancionSonando
}



