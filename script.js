const materias = [
  { id: "cbc_proyectual1", nombre: "Proyectual 1", tipo: "cuatri-sf", requisitos: [] },
  { id: "cbc_proyectual2", nombre: "Proyectual 2", tipo: "cuatri-sf", requisitos: [] },
  { id: "cbc_dibujo", nombre: "Dibujo", tipo: "anual-sf", requisitos: [] },
  { id: "cbc_sye", nombre: "Sociedad y Estado", tipo: "cuatri-f", requisitos: [] },
  { id: "cbc_pc", nombre: "Pensamiento Científico", tipo: "cuatri-f", requisitos: [] },
  { id: "cbc_matematica", nombre: "Matemática", tipo: "cuatri-f", requisitos: [] },
  { id: "cbc_semiologia", nombre: "Semiología", tipo: "cuatri-f", requisitos: [] },

  { id: "tdi1", nombre: "TDI1 - Taller Diseño Industrial 1", tipo: "anual-sf", requisitos: ["cbc_proyectual1", "cbc_proyectual2", "cbc_dibujo", "cbc_sye", "cbc_pc", "cbc_matematica", "cbc_semiologia"] },
  // Aquí se agregan todas las demás materias siguiendo la lógica
];

function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  materias.forEach(materia => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-tipo", materia.tipo);
    card.id = materia.id;

    const aprobada = localStorage.getItem(`${materia.id}_aprobada`) === "true";
    const nota = localStorage.getItem(`${materia.id}_nota`) || "";
    const catedra = localStorage.getItem(`${materia.id}_catedra`) || "";

    const desbloqueada = materia.requisitos.every(id => localStorage.getItem(`${id}_aprobada`) === "true");

    if (!desbloqueada) {
      card.classList.add("locked");
    } else if (aprobada) {
      card.classList.add("approved");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = materia.nombre;

    const labelNota = document.createElement("label");
    labelNota.textContent = "Nota:";

    const inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.value = nota;
    inputNota.disabled = !desbloqueada;

    const labelCatedra = document.createElement("label");
    labelCatedra.textContent = "Cátedra:";

    const inputCatedra = document.createElement("input");
    inputCatedra.type = "text";
    inputCatedra.value = catedra;
    inputCatedra.disabled = !desbloqueada;

    card.appendChild(titulo);
    card.appendChild(labelNota);
    card.appendChild(inputNota);
    card.appendChild(labelCatedra);
    card.appendChild(inputCatedra);

    if (desbloqueada) {
      card.addEventListener("click", () => {
        const fueAprobada = card.classList.toggle("approved");
        localStorage.setItem(`${materia.id}_aprobada`, fueAprobada);
      });
      inputNota.addEventListener("input", () => {
        localStorage.setItem(`${materia.id}_nota`, inputNota.value);
      });
      inputCatedra.addEventListener("input", () => {
        localStorage.setItem(`${materia.id}_catedra`, inputCatedra.value);
      });
    }

    container.appendChild(card);
  });
}

window.addEventListener("load", crearMalla);

