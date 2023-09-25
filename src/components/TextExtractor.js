import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAs } from "file-saver";

const TextExtractor = () => {
  // const textSelections = useSelector((state) => state.pdf.textSelections);
  const dispatch = useDispatch();

  const texteComplet = useSelector(
    (state) => state.textSelectedStore.texteComplet
  );
  const pdfType = useSelector((state) => state.textSelectedStore.pdfType);

  const [cityaRef, setCityaRef] = useState("");
  const [oraliaRef, setOraliaRef] = useState("");

  const [cityaLoc, setCityaLoc] = useState("");
  const [oraliaLoc, setOraliaLoc] = useState("");

  const [cityaBat, setCityaBat] = useState("");
  const [oraliaBat, setOraliaBat] = useState("");

  const [cityaAd, setCityaAd] = useState("");
  const [oraliaAd, setOraliaAd] = useState("");

  // Gère l'extraction du texte et la sauvegarde dans un fichier .txt
  const handleExtractText = () => {
    if (pdfType === "Citya") {
      // REFERENCE
      const regexCitRef = /Référence : (.*?) Origine :/;
      const matchRef = texteComplet.match(regexCitRef);

      if (matchRef) {
        // Le texte extrait est dans match[1]
        setCityaRef(matchRef[1]);
      } else {
        setCityaRef("Aucune correspondance trouvée");
      }
      // LOCATAIRE
      const regexCitLoc = /Locataire : (.*?) Objet :/;
      const matchLoc = texteComplet.match(regexCitLoc);

      if (matchLoc) {
        // Le texte extrait est dans match[1]
        setCityaLoc(matchLoc[1]);
      } else {
        setCityaLoc("Aucune correspondance trouvée");
      }
      // LIEU DE L'INTERVENTION
      //***BATIMENT
      const regexCitBat = /Bâtiment : (.*?) Type/;
      const matchBat = texteComplet.match(regexCitBat);

      if (matchBat) {
        // Le texte extrait est dans match[1]
        setCityaBat(matchBat[1]);
      } else {
        setCityaBat("Aucune correspondance trouvée");
      }
      //***ADRESSE
      const regexCitAd = /Lot (.*?) Bâtiment/;
      const matchAd = texteComplet.match(regexCitAd);

      if (matchAd) {
        // Le texte extrait est dans match[1]
        setCityaAd(matchAd[1]);
      } else {
        setCityaAd("Aucune correspondance trouvée");
      }
    } else if (pdfType === "Oralia") {
      // REFERENCE
      const regexOrRef = /Référence : (.*?) Locataire :/;
      const matchRef = texteComplet.match(regexOrRef);

      if (matchRef) {
        // Le texte extrait est dans match[1]
        setOraliaRef(matchRef[1]);
      } else {
        setOraliaRef("Aucune correspondance trouvée");
      }
      // LOCATAIRE
      const regexOrLoc = /Locataire : (.*?) Bâtiment :/;
      const matchLoc = texteComplet.match(regexOrLoc);

      if (matchLoc) {
        // Le texte extrait est dans match[1]
        setOraliaLoc(matchLoc[1]);
      } else {
        setOraliaLoc("Aucune correspondance trouvée");
      }
      // LIEU DE L'INTERVENTION
      //***BATIMENT
      const regexOrBat = /Bâtiment : (.*?) Objet/;
      const matchBat = texteComplet.match(regexOrBat);

      if (matchBat) {
        // Le texte extrait est dans match[1]
        setOraliaBat(matchBat[1]);
      } else {
        setOraliaBat("Aucune correspondance trouvée");
      }
      //***ADRESSE
      const regexOrAd = /Adresse facturation (.*?) Madame, Monsieur/;
      const matchAd = texteComplet.match(regexOrAd);

      if (matchAd) {
        // Le texte extrait est dans match[1]
        setOraliaAd(matchAd[1]);
      } else {
        setOraliaAd("Aucune correspondance trouvée");
      }
    } else {
      console.log("Autre");
    }
  };

  const handleFileText = () => {
    // Sauvegarder dans un fichier .txt les zones sélectionnées
    if (pdfType === "Citya") {
      // Créez le contenu du fichier texte
      const fileContent = `Référence : ${cityaRef}\nLocataire : ${cityaLoc}\nBâtiment : ${cityaBat}\nAdresse : ${cityaAd}`;

      // Créez un objet Blob à partir du contenu
      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });

      // Utilisez FileSaver.js pour télécharger le fichier
      saveAs(blob, "citya_data.txt");
    } else if (pdfType === "Oralia") {
      // Créez le contenu du fichier texte
      const fileContent = `Référence : ${oraliaRef}\nLocataire : ${oraliaLoc}\nBâtiment : ${oraliaBat}\nAdresse : ${oraliaAd}`;

      // Créez un objet Blob à partir du contenu
      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });

      // Utilisez FileSaver.js pour télécharger le fichier
      saveAs(blob, "oralia_data.txt");
    } else if (pdfType === "Autre") {
      // Créez le contenu du fichier texte
      const fileContent = texteComplet;

      // Créez un objet Blob à partir du contenu
      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });

      // Utilisez FileSaver.js pour télécharger le fichier
      saveAs(blob, "file_data.txt");
    }
    // // Clear
    // dispatch(clearTextSelections());
  };

  useEffect(() => {
    handleExtractText();
  }, [pdfType]);

  if (!pdfType) {
    return null; // Ne renvoie rien si pdfType n'est pas renseigné
  }

  return (
    <div>
      <h3>Zones à extraire:</h3>
      <h4>Référence</h4>
      <h5>{cityaRef ? cityaRef : oraliaRef ? oraliaRef : "non extrait"}</h5>

      <h4>Locataire</h4>
      <h5>{cityaLoc ? cityaLoc : oraliaLoc ? oraliaLoc : "non extrait"}</h5>
      <h4>Lieu de l'intervention</h4>
      <h4>*** Bâtiment:</h4>
      <h5>{cityaBat ? cityaBat : oraliaBat ? oraliaBat : "non extrait"}</h5>
      <h4>*** Adresse:</h4>
      <h5>{cityaAd ? cityaAd : oraliaAd ? oraliaAd : "non extrait"}</h5>

      <button onClick={handleFileText}>Création fichier .txt</button>
    </div>
  );
};

export default TextExtractor;
