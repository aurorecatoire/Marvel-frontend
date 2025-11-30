const removeFave = ({ array, element, setArray }) => { //Fonction pour enlever un comics/personnage des favoris
  let copy = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== element) {
      copy.push(array[i]);
    }
  }
  setArray(copy);
};

export default removeFave;
