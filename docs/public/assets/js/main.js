const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalLink = document.querySelector("#modal-link");
const closeModal = document.querySelector(".modal-close");
const backdrop = document.querySelector(".modal-backdrop");

document.querySelectorAll(".project").forEach(project => {
  project.querySelector(".project-button").addEventListener("click", () => {
    modalImage.src = project.dataset.image;
    modalImage.alt = project.dataset.title;
    modalTitle.textContent = project.dataset.title;
    modalDescription.textContent = project.dataset.description;
    if(project.dataset.title!="Projeto em andamento"){
        modalLink.href = project.dataset.link;
        modalLink.textContent = 'Acesse o GitHub: '+project.dataset.title;
        modalLink.target = '_blank'; // Abre em uma nova aba
    }else{
        modalLink.textContent = ""
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideModal);
backdrop.addEventListener("click", hideModal);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideModal();
});

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.12 }
);

document.querySelectorAll("section > *").forEach(el => {
  if (!el.classList.contains("hero-name") && !el.classList.contains("hero-photo")) {
    el.classList.add("reveal");
    observer.observe(el);
  }
});

