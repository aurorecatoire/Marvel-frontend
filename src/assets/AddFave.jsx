//Fonction pour ajouter un comics/personnage dans les favoris
const addFave = ({ array, element, setArray }) => {
  let copy = [...array];
  copy.push(element);
  setArray(copy);
};

export default addFave;
