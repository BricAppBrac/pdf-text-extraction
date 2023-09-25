import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPdfFile } from "../feature/textSelectedSlice";
import { setPdfName } from "../feature/textSelectedSlice";
import { setMessageInfo } from "../feature/messageInfoSlice";

const UploadPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const pdfFile = useSelector((state) => state.textSelectedStore.pdfFile);
  const pdfName = useSelector((state) => state.textSelectedStore.pdfName);

  // Stocke le fichier sélectionné dans le store
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);

    const fileUrl = URL.createObjectURL(file);
    dispatch(setPdfFile(fileUrl));
    dispatch(setPdfName(file.name));
  };

  // Appelle le téléchargement du fichier
  // const handleUpload = () => {
  //   console.log("fichier à télécharger");
  //   if (selectedFile) {
  //     onFileUpload(selectedFile);
  //     // Réinitialise le champ de sélection de fichier
  //     setSelectedFile(null);
  //   } else {
  //     alert("Veuillez sélectionner un fichier PDF.");
  //   }
  // };

  return (
    <div className="upload-content">
      <h3>**********************************</h3>
      <h3>FICHIER CHOISI</h3>
      <h3>**********************************</h3>
      {pdfName ? (
        pdfName
      ) : (
        <div className="upload-file">
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          {/* <button onClick={handleUpload}>Télécharger</button> */}
        </div>
      )}
    </div>
  );
};

export default UploadPdf;
