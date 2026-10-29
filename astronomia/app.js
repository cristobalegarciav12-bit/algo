// ============================================
// AstroEstudiantes - App de Astronomía
// Diseño tipo PPT con transiciones increíbles
// ============================================

const state = {
  edad: '10-13',
  nivel: 'principiante',
  eventoActual: null,
  slideActual: 1,
  totalSlides: 7
};

const $ = id => document.getElementById(id);
const els = {
  edad: $('edad'),
  nivel: $('nivel'),
  btnGuardar: $('guardar-perfil'),
  msgPerfil: $('perfil-guardado'),
  fecha: $('fecha'),
  btnBuscar: $('btn-buscar'),
  btnAzar: $('btn-azar'),
  fechaInfo: $('fecha-info'),
  presentationCard: $('presentation-card'),
  quizCard: $('quiz-card')
};

const hoy = new Date().toISOString().split('T')[0];
if (els.fecha) els.fecha.value = hoy;

// Perfil
if (els.btnGuardar) {
  els.btnGuardar.onclick = () => {
    state.edad = els.edad.value;
    state.nivel = els.nivel.value;
    els.msgPerfil.style.display = 'block';
    setTimeout(() => els.msgPerfil.style.display = 'none', 2500);
  };
}

function mostrarEstado(msg, tipo = 'info') {
  if (!els.fechaInfo) return;
  els.fechaInfo.textContent = msg;
  els.fechaInfo.style.color = tipo === 'error' ? '#ef4444' : (tipo === 'exito' ? '#4ade80' : '#94a3b8');
}

function limpiarHTML(texto) {
  if (!texto) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = texto;
  return tmp.textContent || tmp.innerText || texto;
}

// Base de datos de eventos con información detallada
const EVENTOS = {
  '2026-10-27': {
    tipo: 'meteoros',
    titulo: 'Lluvia de meteoros Oriónidas',
    fecha: '2026-10-27',
    fuente: 'NASA APOD',
    descripcion: [
      'Las Oriónidas son una de las lluvias de meteoros más importantes del año. Ocurre cuando la Tierra atraviesa la estela de polvo y hielo del cometa Halley.',
      'Cada partícula entra a la atmósfera a más de 66 km por segundo y se quema por la fricción, creando estelas de luz llamadas "estrellas fugaces".',
      'Se puede observar desde cualquier lugar con cielo oscuro, sin necesidad de telescopio.'
    ],
    comoFunciona: [
      'El cometa Halley deja polvo y hielo en su órbita cada 76 años. La Tierra cruza esa estela cada octubre.',
      'Las partículas se calientan al entrar a la atmósfera y producen la estela luminosa.',
      'Partículas más grandes crean bólidos muy brillantes que iluminan el cielo.'
    ],
    frecuencia: [
      'Ocurre una vez al año, durante todo octubre, con pico entre el 20 y 24 de octubre.',
      'Se pueden ver entre 15 y 20 meteoros por hora en condiciones ideales.',
      'Se repite anualmente porque la órbita de la Tierra siempre cruza la estela del cometa.'
    ],
    involucrados: [
      'Cometa Halley: dejó la estela de polvo y hielo.',
      'Tierra: cruza la estela cada octubre.',
      'Atmósfera terrestre: donde se queman las partículas.',
      'Observadores: personas que ven el espectáculo desde la Tierra.'
    ],
    curiosidad: 'Aunque el cometa Halley solo pasa cada 76 años, su estela permanece en el espacio, por lo que vemos las Oriónidas cada año.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Leonid_MeteorStorm.jpg/800px-Leonid_MeteorStorm.jpg',
    copyright: 'NASA / APOD'
  },
  '2026-10-05': {
    tipo: 'galaxia',
    titulo: 'Galaxia Sombrero (M104)',
    fecha: '2026-10-05',
    fuente: 'NASA APOD',
    descripcion: [
      'La Galaxia Sombrero está a 28 millones de años luz de la Tierra, en la constelación de Virgo.',
      'Se llama así porque se parece a un sombrero mexicano: brillante en el centro con un anillo oscuro de polvo alrededor.',
      'Tiene 50.000 años luz de diámetro y cientos de miles de millones de estrellas.'
    ],
    comoFunciona: [
      'Es un sistema unido por gravedad con estrellas, gas, polvo y materia oscura.',
      'En el centro hay un bulbo brillante con estrellas viejas y posiblemente un agujero negro supermasivo.',
      'El anillo de polvo bloquea la luz de estrellas detrás, creando el efecto visual de sombrero.'
    ],
    frecuencia: [
      'Es una galaxia permanente en el universo, visible todo el año con telescopio.',
      'Mejor observada en primavera en el hemisferio norte.',
      'La luz que vemos viajó 28 millones de años para llegar a nosotros.'
    ],
    involucrados: [
      'Estrellas: cientos de miles de millones.',
      'Gas interestelar: hidrógeno y helio donde nacen estrellas.',
      'Polvo cósmico: forma el anillo oscuro.',
      'Materia oscura: mantiene unida a la galaxia.',
      'Agujero negro supermasivo: probablemente en el centro.'
    ],
    curiosidad: 'El disco está visto casi de canto desde la Tierra, lo que realza el efecto sombrero. Se detectaron colisiones con otras galaxias en el pasado.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/M104_Sombrero_Galaxy.jpg/800px-M104_Sombrero_Galaxy.jpg',
    copyright: 'Engelbert Vollmer / NASA APOD'
  },
  '2026-10-03': {
    tipo: 'planeta',
    titulo: 'Rover Curiosity en Marte',
    fecha: '2026-10-03',
    fuente: 'NASA APOD',
    descripcion: [
      'El rover Curiosity de la NASA explora Marte desde 2012 en el cráter Gale.',
      'Es del tamaño de un automóvil y busca evidencia de vida microbiana en el pasado de Marte.',
      'Ha recorrido decenas de kilómetros, escalado colinas y perforado rocas.'
    ],
    comoFunciona: [
      'Se mueve con seis ruedas de aluminio y tracción en las cuatro ruedas.',
      'Tiene cámaras, brazo robótico con taladro, láser ChemCam y estación meteorológica.',
      'Envía datos a la Tierra a través de orbitadores marcianos como repetidoras.'
    ],
    frecuencia: [
      'Está operativo desde 2012 y sigue enviando datos.',
      'Las misiones a Marte se lanzan cada 26 meses aproximadamente.',
      'Opera sol por sol (día marciano de 24 horas y 40 minutos).'
    ],
    involucrados: [
      'Planeta Marte: objetivo de la exploración.',
      'NASA: agencia que diseña y opera la misión.',
      'Rover Curiosity: vehículo explorador.',
      'JPL: centro de la NASA que controla el rover.',
      'Científicos internacionales: analizan los datos.'
    ],
    curiosidad: 'Los científicos de la NASA trabajan en "hora marciana" (24h 40m), desfasándose del horario terrestre.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Pia17934-%27Selfie%27_at_Murray_Buttes.jpg/800px-Pia17934-%27Selfie%27_at_Murray_Buttes.jpg',
    copyright: 'NASA / JPL-Caltech / MSSS'
  },
  '2026-10-06': {
    tipo: 'aurora',
    titulo: 'Aurora boreal desde nave SMILE',
    fecha: '2026-10-06',
    fuente: 'NASA APOD',
    descripcion: [
      'La nave SMILE (ESA y CAS) capturó una aurora boreal oval completa alrededor del polo norte.',
      'Las auroras son luces verdes, rojas y púrpuras que bailan en el cielo nocturno.',
      'SMILE puede observarlas incluso durante el día con imagen ultravioleta.'
    ],
    comoFunciona: [
      'El Sol emite viento solar (partículas cargadas) que llega a la Tierra.',
      'Algunas partículas penetran la magnetosfera y van hacia los polos.',
      'Al chocar con oxígeno y nitrógeno en la atmósfera, liberan energía como luz visible.'
    ],
    frecuencia: [
      'Ocurren regularmente cerca de los polos, muchas noches al año.',
      'Aumentan durante el ciclo solar de 11 años.',
      'En tormentas solares intensas se ven desde latitudes más bajas.'
    ],
    involucrados: [
      'El Sol: fuente del viento solar.',
      'Campo magnético terrestre: guía partículas hacia los polos.',
      'Atmósfera alta: donde se produce la luz.',
      'Nave SMILE: observa desde el espacio.',
      'ESA y CAS: agencias que operan la misión.'
    ],
    curiosidad: 'Las auroras también ocurren en Júpiter, Saturno, Urano, Neptuno y la luna Ganimedes.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Aurora_borealis.jpg/800px-Aurora_borealis.jpg',
    copyright: 'ESA / CAS / SMILE / NASA APOD'
  },
  '2026-04-08': {
    tipo: 'eclipse_solar',
    titulo: 'Eclipse solar total',
    fecha: '2026-04-08',
    fuente: 'NASA APOD',
    descripcion: [
      'La Luna se interpone entre la Tierra y el Sol, bloqueando la luz solar completamente.',
      'Durante la totalidad, el cielo se oscurece como de noche y se ve la corona solar.',
      'El Sol es 400 veces más grande que la Luna, pero también está 400 veces más lejos.'
    ],
    comoFunciona: [
      'La Luna orbita la Tierra cada 29.5 días y a veces se alinea perfectamente con el Sol.',
      'Desde la zona de umbra, el disco lunar tapa completamente al disco solar.',
      'La sombra se mueve a miles de km/h, por lo que la totalidad dura solo unos minutos.'
    ],
    frecuencia: [
      'Ocurren cada 18 meses aproximadamente en algún lugar de la Tierra.',
      'En un lugar específico pueden pasar décadas entre dos eclipses totales.',
      'Entre 2 y 5 eclipses solares ocurren cada año de algún tipo.'
    ],
    involucrados: [
      'El Sol: fuente de luz bloqueada.',
      'La Luna: se interpone entre el Sol y la Tierra.',
      'La Tierra: donde se observa y se proyecta la sombra.'
    ],
    curiosidad: 'Durante un eclipse total, la temperatura puede descender 3-10 grados y se ven planetas en el cielo diurno.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Solar_eclipse_of_August_21_2017_%284%29.jpg/800px-Solar_eclipse_of_August_21_2017_%284%29.jpg',
    copyright: 'NASA / APOD'
  },
  '2026-03-14': {
    tipo: 'eclipse_lunar',
    titulo: 'Eclipse lunar total',
    fecha: '2026-03-14',
    fuente: 'NASA APOD',
    descripcion: [
      'La Tierra se interpone entre el Sol y la Luna, proyectando su sombra sobre la Luna.',
      'Durante la totalidad, la Luna se vuelve rojiza o anaranjada ("luna de sangre").',
      'Solo ocurre en fase de luna llena.'
    ],
    comoFunciona: [
      'La Tierra proyecta un cono de sombra: umbra (oscura) y penumbra (clara).',
      'Cuando la Luna entra en la umbra, hay eclipse lunar total.',
      'La luz roja es luz solar refractada por la atmósfera terrestre.'
    ],
    frecuencia: [
      'Unos dos eclipses lunares al año en promedio.',
      'Son visibles desde todo el hemisferio nocturno de la Tierra.',
      'Puede haber hasta tres en un año.'
    ],
    involucrados: [
      'El Sol: proporciona la luz.',
      'La Tierra: proyecta la sombra y refracta la luz roja.',
      'La Luna: entra en la sombra y se vuelve rojiza.'
    ],
    curiosidad: 'Los eclipses lunares son seguros de observar a simple vista, sin gafas especiales.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Lunar_eclipse_20180727.jpg/800px-Lunar_eclipse_20180727.jpg',
    copyright: 'NASA / APOD'
  },
  '2026-10-26': {
    tipo: 'conjuncion',
    titulo: 'Conjunción de Venus y la Luna',
    fecha: '2026-10-26',
    fuente: 'Datos astronómicos integrados',
    descripcion: [
      'Venus y la Luna aparecen muy cerca en el cielo al amanecer o atardecer.',
      'Son un efecto de perspectiva: en realidad están a millones de kilómetros de distancia.',
      'Venus es el tercer objeto más brillante del cielo.'
    ],
    comoFunciona: [
      'La Luna orbita la Tierra cada 29.5 días y Venus orbita el Sol cada 225 días.',
      'Sus caminos aparentes se cruzan en el cielo desde nuestra perspectiva.',
      'La Luna se mueve más rápido entre las estrellas, creando encuentros periódicos.'
    ],
    frecuencia: [
      'Ocurren varias veces al año.',
      'Algunas son más estrechas y espectaculares que otras.',
      'Son predecibles con gran precisión.'
    ],
    involucrados: [
      'Planeta Venus: objeto más brillante después del Sol y la Luna.',
      'La Luna: nuestro satélite natural.',
      'La Tierra: desde donde se observa.'
    ],
    curiosidad: 'Venus puede ser visible incluso de día si sabes dónde mirar.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Venus_and_Moon_conjunction.jpg/800px-Venus_and_Moon_conjunction.jpg',
    copyright: 'Datos astronómicos integrados'
  },
  '2026-10-25': {
    tipo: 'luna',
    titulo: 'Fase de Luna Creciente',
    fecha: '2026-10-25',
    fuente: 'Datos astronómicos integrados',
    descripcion: [
      'La Luna creciente muestra su parte derecha iluminada (hemisferio norte).',
      'Es fácil de observar con binoculares o telescopios pequeños.',
      'Aparece en el cielo occidental después del atardecer.'
    ],
    comoFunciona: [
      'La Luna refleja la luz del Sol, no produce luz propia.',
      'Desde la Tierra vemos diferentes porciones iluminadas según su órbita.',
      'En creciente, la porción iluminada aumenta cada noche.'
    ],
    frecuencia: [
      'El ciclo lunar dura 29.5 días.',
      'La fase creciente ocurre aproximadamente una vez al mes.',
      'Cada fase principal dura aproximadamente una semana.'
    ],
    involucrados: [
      'La Luna: cuerpo que observamos.',
      'El Sol: fuente de luz.',
      'La Tierra: desde donde observamos.'
    ],
    curiosidad: 'En el hemisferio sur, la creciente aparece iluminada por el lado izquierdo.',
    urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/FullMoon2010.jpg/800px-FullMoon2010.jpg',
    copyright: 'Datos astronómicos integrados'
  }
};

function eventoGenerico(fecha) {
  const lista = [
    {
      titulo: 'Lluvia de meteoros',
      descripcion: ['La Tierra atraviesa una estela de polvo cósmico del espacio.', 'Las partículas se queman al entrar a la atmósfera creando "estrellas fugaces".'],
      comoFunciona: ['Partículas de polvo entran a la atmósfera a gran velocidad.', 'La fricción con el aire las calienta y produce estelas de luz.'],
      frecuencia: ['Varias lluvias de meteoros ocurren cada año.'],
      involucrados: ['Cometas', 'Polvo espacial', 'Atmósfera terrestre'],
      curiosidad: 'La mayoría de meteoros se desintegran antes de tocar el suelo.',
      tipo: 'meteoros',
      urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Leonid_MeteorStorm.jpg/800px-Leonid_MeteorStorm.jpg'
    },
    {
      titulo: 'Nebulosa estelar',
      descripcion: ['Una nube gigante de gas y polvo donde nacen estrellas.', 'Está compuesta principalmente por hidrógeno y polvo cósmico.'],
      comoFunciona: ['La gravedad agrupa el gas y el polvo en nubes más densas.', 'Cuando hay suficiente densidad, nace una estrella.'],
      frecuencia: ['Miles de nebulosas en la Vía Láctea.'],
      involucrados: ['Gas hidrógeno', 'Polvo cósmico', 'Estrellas recién nacidas'],
      curiosidad: 'El Sol se formó a partir de una nebulosa hace 4.600 millones de años.',
      tipo: 'galaxia',
      urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Orion_Nebula_%28ESO%29.jpg/800px-Orion_Nebula_%28ESO%29.jpg'
    },
    {
      titulo: 'Conjunción planetaria',
      descripcion: ['Dos planetas aparecen muy cerca en el cielo nocturno.', 'En realidad están separados por millones de kilómetros.'],
      comoFunciona: ['Los planetas se mueven entre las estrellas a diferentes velocidades.', 'Cuando sus caminos se cruzan, vemos una conjunción.'],
      frecuencia: ['Unas cuantas veces al año.'],
      involucrados: ['Planetas', 'Estrellas de fondo', 'La Tierra'],
      curiosidad: 'Han sido observadas por civilizaciones antiguas durante miles de años.',
      tipo: 'planeta',
      urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Venus_and_Moon_conjunction.jpg/800px-Venus_and_Moon_conjunction.jpg'
    },
    {
      titulo: 'Aurora polar',
      descripcion: ['Luces naturales en los cielos de las regiones polares.', 'Se presentan como cortinas verdes, rosadas y púrpuras.'],
      comoFunciona: ['El Sol emite viento solar con partículas cargadas.', 'Al chocar con gases atmosféricos, liberan energía como luz.'],
      frecuencia: ['Ocurren regularmente cerca de los polos, muchas noches al año.'],
      involucrados: ['El Sol', 'Campo magnético', 'Atmósfera alta'],
      curiosidad: 'También se observan en Júpiter, Saturno, Urano y Neptuno.',
      tipo: 'aurora',
      urlMedia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Aurora_borealis.jpg/800px-Aurora_borealis.jpg'
    }
  ];
  const e = lista[Math.floor(Math.random() * lista.length)];
  return { ...e, fecha, fuente: 'Datos de espacio integrados', usaRespaldo: true };
}

async function obtenerEvento(fecha) {
  if (EVENTOS[fecha]) {
    return { ...EVENTOS[fecha] };
  }
  return eventoGenerico(fecha);
}

function renderPresentacion(evento) {
  state.eventoActual = evento;
  state.slideActual = 1;
  state.totalSlides = 7;

  // Encabezado
  const t1 = $('ppt-titulo-slide');
  const t2 = $('ppt-fecha-slide');
  if (t1) t1.textContent = evento.titulo;
  if (t2) t2.textContent = evento.fecha;

  // Diapositiva 1: Título + Imagen realista
  const tt = $('ppt-titulo');
  if (tt) tt.textContent = evento.titulo;

  const contImg = $('ppt-imagen-wrapper');
  if (contImg) {
    contImg.innerHTML = '';
    if (evento.urlMedia) {
      const img = document.createElement('img');
      img.src = evento.urlMedia;
      img.alt = evento.titulo;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '14px';
      img.onerror = () => {
        img.style.display = 'none';
        contImg.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#94a3b8;"><div style="font-size:4rem;margin-bottom:1rem;">🌌</div><div style="font-size:1.2rem;font-weight:600;color:#c4b5fd;">${evento.titulo}</div><div style="font-size:0.9rem;margin-top:0.5rem;">Imagen no disponible</div></div>`;
      };
      contImg.appendChild(img);
    } else {
      contImg.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#94a3b8;"><div style="font-size:4rem;margin-bottom:1rem;">🌌</div><div style="font-size:1.2rem;font-weight:600;color:#c4b5fd;">${evento.titulo}</div><div style="font-size:0.9rem;margin-top:0.5rem;">Imagen no disponible</div></div>`;
    }
  }

  const cred = $('ppt-credito');
  if (cred) cred.textContent = `Datos: ${evento.fuente}`;
  const fe = $('ppt-fecha-evento');
  if (fe) fe.textContent = `Fecha: ${evento.fecha}`;

  // Diapositiva 2: ¿Qué es?
  const d = $('ppt-descripcion');
  if (d) d.innerHTML = (evento.descripcion || ['Info no disponible.']).map(p => `<p>${p}</p>`).join('');

  // Diapositiva 3: ¿Cómo funciona?
  const c = $('ppt-como-funciona');
  if (c) c.innerHTML = (evento.comoFunciona || ['Info no disponible.']).map(p => `<p>${p}</p>`).join('');

  // Diapositiva 4: Frecuencia
  const f = $('ppt-frecuencia');
  if (f) f.innerHTML = (evento.frecuencia || ['Info no disponible.']).map(p => `<p>${p}</p>`).join('');

  // Diapositiva 5: Involucrados
  const i = $('ppt-involucrados');
  if (i) i.innerHTML = (evento.involucrados || ['Info no disponible.']).map(p => `<p>• ${p}</p>`).join('');

  // Diapositiva 6: Curiosidad
  const cur = $('ppt-curiosidad');
  if (cur) cur.textContent = evento.curiosidad || 'No hay datos curiosos.';

  // Diapositiva 7: Resumen
  const rt = $('resumen-titulo');
  const rf = $('resumen-fecha');
  const rfu = $('resumen-fuente');
  const rn = $('resumen-nivel');
  if (rt) rt.textContent = evento.titulo;
  if (rf) rf.textContent = evento.fecha;
  if (rfu) rfu.textContent = evento.fuente;
  if (rn) rn.textContent = state.nivel === 'principiante' ? 'Principiante' : (state.nivel === 'intermedio' ? 'Intermedio' : 'Avanzado');

  // Mostrar tarjeta
  if (els.presentationCard) els.presentationCard.style.display = 'block';
  if (els.quizCard) els.quizCard.style.display = 'none';
  if (els.presentationCard) els.presentationCard.scrollIntoView({ behavior: 'smooth' });

  // Mostrar diapositiva 1 con animación de entrada
  mostrarDiapositiva(1, 'fade');
  mostrarEstado('Presentación lista ✅', 'exito');
}

// ============================================
// TRANSICIONES ENTRE DIAPOSITIVAS
// ============================================
function mostrarDiapositiva(n, direccion = 'siguiente') {
  // Remover clases de animación de todas las diapositivas
  document.querySelectorAll('.ppt-slide').forEach(s => {
    s.classList.remove('active', 'slide-next', 'slide-prev', 'slide-current-exit', 'slide-current-exit-prev', 'fade-in', 'fade-out');
  });

  const salida = $(`slide-${state.slideActual}`);
  const entrada = $(`slide-${n}`);

  if (direccion === 'siguiente') {
    // Diapositiva actual sale hacia la izquierda
    if (salida) salida.classList.add('slide-current-exit');
    // Nueva diapositiva entra desde la derecha
    if (entrada) {
      entrada.classList.add('active', 'slide-next');
    }
  } else if (direccion === 'anterior') {
    // Diapositiva actual sale hacia la derecha
    if (salida) salida.classList.add('slide-current-exit-prev');
    // Nueva diapositiva entra desde la izquierda
    if (entrada) {
      entrada.classList.add('active', 'slide-prev');
    }
  } else {
    // Primera carga o cambio directo - fade
    if (entrada) {
      entrada.classList.add('active', 'fade-in');
    }
  }

  state.slideActual = n;

  const cont = $('ppt-contador');
  if (cont) cont.textContent = `Diapositiva ${n} de ${state.totalSlides}`;

  const ant = $('btn-ppt-anterior');
  const sig = $('btn-ppt-siguiente');
  if (ant) ant.disabled = n === 1;
  if (sig) sig.disabled = n === state.totalSlides;
}

$('btn-ppt-anterior').onclick = () => {
  if (state.slideActual > 1) {
    mostrarDiapositiva(state.slideActual - 1, 'anterior');
  }
};

$('btn-ppt-siguiente').onclick = () => {
  if (state.slideActual < state.totalSlides) {
    mostrarDiapositiva(state.slideActual + 1, 'siguiente');
  }
};

$('btn-ppt-cerrar').onclick = () => {
  if (els.presentationCard) els.presentationCard.style.display = 'none';
  mostrarEstado('');
};

$('btn-ppt-quiz').onclick = () => {
  if (!state.eventoActual) return;
  generarQuiz(state.eventoActual);
  mostrarQuiz();
};

// ============================================
// Quiz
// ============================================
function generarQuiz(e) {
  const desc = Array.isArray(e.descripcion) ? e.descripcion.join(' ') : (e.descripcion || '');
  const como = Array.isArray(e.comoFunciona) ? e.comoFunciona.join(' ') : (e.comoFunciona || '');
  const freq = Array.isArray(e.frecuencia) ? e.frecuencia.join(' ') : (e.frecuencia || '');
  const inv = Array.isArray(e.involucrados) ? e.involucrados.join(' ') : (e.involucrados || '');
  const cur = e.curiosidad || '';

  const base = [
    { p: '¿De qué trata principalmente este evento?', o: [desc.split('. ')[0] || desc, 'Un planeta nuevo', 'Una estrella que se apaga', 'Un satélite artificial'], c: 0 },
    { p: '¿Cómo funciona este evento astronómico?', o: [como.split('. ')[0] || como, 'Por magia', 'No se sabe', 'Por el viento'], c: 0 },
    { p: '¿Con qué frecuencia ocurre este evento?', o: [freq.split('. ')[0] || freq, 'Solo una vez en la vida', 'Cada minuto', 'Nunca'], c: 0 },
    { p: '¿Quiénes están involucrados en este evento?', o: [inv.split('. ')[0] || inv, 'Solo los astronautas', 'Solo el Sol', 'Nadie'], c: 0 },
    { p: '¿Qué dato curioso aprendiste?', o: [cur.split('. ')[0] || cur, 'Que no pasa nada', 'Que es peligroso', 'Que es mentira'], c: 0 }
  ];

  const mix = base.map(item => {
    const opts = [...item.o];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return { ...item, o: opts, c: opts.indexOf(item.o[item.c]) };
  });

  state.quiz.preguntas = mix.slice(0, 3);
  state.quiz.indice = 0;
  state.quiz.aciertos = 0;
  state.quiz.respondido = false;
}

function mostrarQuiz() {
  if (els.quizCard) els.quizCard.style.display = 'block';
  if (els.presentationCard) els.presentationCard.style.display = 'none';
  mostrarQuizPregunta();
}

function mostrarQuizPregunta() {
  const item = state.quiz.preguntas[state.quiz.indice];
  const qa = $('q-actual');
  const qt = $('q-total');
  const qp = $('quiz-pregunta');
  if (qa) qa.textContent = state.quiz.indice + 1;
  if (qt) qt.textContent = state.quiz.preguntas.length;
  if (qp) qp.textContent = item.pregunta;

  const co = $('quiz-opciones');
  if (co) {
    co.innerHTML = '';
    item.o.forEach((op, i) => {
      const btn = document.createElement('button');
      btn.className = 'opcion-btn';
      btn.textContent = op;
      btn.onclick = () => responderQuiz(i);
      co.appendChild(btn);
    });
  }

  $('quiz-retroalimentacion').style.display = 'none';
  $('btn-siguiente').style.display = 'none';
  $('btn-cerrar-quiz').style.display = 'inline-flex';
  $('quiz-resultado').style.display = 'none';
  if (els.quizCard) els.quizCard.scrollIntoView({ behavior: 'smooth' });
}

function responderQuiz(i) {
  if (state.quiz.respondido) return;
  state.quiz.respondido = true;

  const item = state.quiz.preguntas[state.quiz.indice];
  const btns = document.querySelectorAll('.opcion-btn');
  const retro = $('quiz-retroalimentacion');

  btns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === item.c) b.classList.add('correcta');
    if (idx === i && idx !== item.c) b.classList.add('incorrecta');
  });

  if (i === item.c) {
    state.quiz.aciertos++;
    retro.className = 'retroalimentacion correcta';
    retro.textContent = '¡Correcto! 🎉';
  } else {
    retro.className = 'retroalimentacion incorrecta';
    retro.textContent = `Incorrecto. La respuesta correcta era: ${item.o[item.c]}`;
  }
  retro.style.display = 'block';

  const sig = $('btn-siguiente');
  sig.style.display = 'inline-flex';
  if (state.quiz.indice === state.quiz.preguntas.length - 1) sig.textContent = 'Ver resultado';
}

$('btn-siguiente').onclick = () => {
  if (state.quiz.indice < state.quiz.preguntas.length - 1) {
    state.quiz.indice++;
    state.quiz.respondido = false;
    mostrarQuizPregunta();
  } else {
    mostrarResultadoQuiz();
  }
};

function mostrarResultadoQuiz() {
  const total = state.quiz.preguntas.length;
  const ac = state.quiz.aciertos;
  const res = $('quiz-resultado');
  $('btn-siguiente').style.display = 'none';
  res.style.display = 'block';
  let msg = ac === total ? '¡Excelente! Dominas el tema.' : (ac >= total / 2 ? 'Muy bien, pero puedes repasar un poco más.' : 'Sigue investigando, ¡tú puedes!');
  res.innerHTML = `<h3>Resultado: ${ac} de ${total}</h3><p>${msg}</p>`;
  res.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

$('btn-cerrar-quiz').onclick = () => {
  if (els.quizCard) els.quizCard.style.display = 'none';
  if (els.presentationCard) els.presentationCard.style.display = 'block';
  if (els.presentationCard) els.presentationCard.scrollIntoView({ behavior: 'smooth' });
};

// ============================================
// Búsqueda
// ============================================
els.btnBuscar.onclick = async () => {
  const fecha = els.fecha.value;
  if (!fecha) { mostrarEstado('Elige una fecha válida.', 'error'); return; }
  mostrarEstado('Buscando evento astronómico...', 'info');
  const evento = await obtenerEvento(fecha);
  renderPresentacion(evento);
};

els.btnAzar.onclick = async () => {
  const inicio = new Date('2020-01-01');
  const fin = new Date();
  const ale = new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
  const fecha = ale.toISOString().split('T')[0];
  els.fecha.value = fecha;
  mostrarEstado('🎲 Fecha al azar...', 'info');
  const evento = await obtenerEvento(fecha);
  renderPresentacion(evento);
};
