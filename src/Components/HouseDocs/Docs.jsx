// Import => React
import React, { useState, useContext } from 'react';
import { Context } from '../../Context/LangContext';
import content from '../../Localization/Content';

import Trash from '@mui/icons-material/ClearRounded';

// Import => Components
import style from './Docs.module.scss';
import "../Form/Form.scss";

function Docs({ document, setDocs }) {

  const [show, setshow] = useState(false)
  const { lang, setLang } = useContext(Context);

  function Delete(e) {
    setDocs('')
    setshow(false)
  }

  let formdata = new FormData();

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  function dropImageHandler(e) {
    formdata.append('key', 'Service For C Group')
    formdata.append("file", e);
    fetch("http://ali98.uz/api/service", requestOptions)
      .then(response => response.text())
      .then(function (response) {
        setshow(true)
        let res = JSON.parse(response)
        setDocs(res.data)
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>

      <div className="change" style={{ display: show ? 'block' : 'none' }}  >
        <img src={document} alt={document} className="img" />
        <Trash onClick={(e) => Delete(e)} className="icon" />
      </div>

      <div className={style.Group}>
        <label htmlFor="file" className={style.label}>{content[lang].adverd_documents_dow}</label>
        <input type="file" id='file' onChange={(e) => dropImageHandler(e.target.files[0])} className={style.input} />
      </div>
    </>
  )
}

export default Docs