//Fontion renvoyant les différents numéros de pages a afficher sous la forme d'un tableau

const NumberPages = (page, elements) => {
  const totalPages = Math.ceil(elements / 100);
  const maxButtons = 10; {/* 10 boutons à afficher en permanence*/}
  let tab = [];

  let start = Math.max(1, page - maxButtons / 2);
  let end = Math.min(totalPages, start + maxButtons - 1);

  // Ajuster start si on a moins de maxButtons à la fin ( par exemple à la page 12, 13 s'il y a 15 pages au total )
  start = Math.max(1, end - maxButtons + 1);

  for (let i = start; i <= end; i++) {
    tab.push(i);
  }

  return tab;
};

export default NumberPages;
