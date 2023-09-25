import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TextExtractor from "../components/TextExtractor";
import UploadPdf from "../components/UploadPdf";
import PDFViewer from "../components/PDFViewer";
import { useDispatch, useSelector } from "react-redux";
import {
  setPdfFile,
  setPdfName,
  clearPdfFile,
  clearPdfName,
} from "../feature/textSelectedSlice";
import { clearMessageInfo } from "../feature/messageInfoSlice";

const Home = () => {
  const pdfFile = useSelector((state) => state.textSelectedStore.pdfFile);
  const messageInfoFromStore = useSelector(
    (state) => state.messageInfoStore.messageInfo
  );
  const [clickHome, setClickHome] = useState(false);

  const [messageInfo, setMessageInfo] = useState(messageInfoFromStore);

  const dispatch = useDispatch();

  const handleHome = () => {
    setClickHome(true);
  };

  useEffect(() => {
    // Défilement vers le haut de la page au chargement
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMessageInfo(messageInfoFromStore);
  }, [messageInfoFromStore]);

  useEffect(() => {
    dispatch(clearPdfFile());
    dispatch(clearPdfName());
    dispatch(clearMessageInfo());
  }, [clickHome]);

  let content = (
    <div className="home">
      <div className="home-title">
        <h1>PDF Text Extractor</h1>
        <button onClick={handleHome}>
          <i className="fa-solid fa-house"></i>
        </button>
      </div>
      <div className="home-content">
        <p>{messageInfo}</p>
        <UploadPdf />
        {pdfFile ? <PDFViewer pdfUrl={pdfFile} /> : null}
        {pdfFile ? <TextExtractor /> : null}
      </div>
    </div>
  );

  return content;
};

export default Home;