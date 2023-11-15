import React, { useState } from "react";
import userImage from "../assets/userImage.png";

import "../styles/EditSettings.css";

function EditSettings() {
  //variaveis e funções da edição de imagem
  const [image, setImage] = useState(userImage);
  const fileInputRef = React.createRef();

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  //variáveis e funções do formulário
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="profileInformationEditSettings">
      <h1>Profile</h1>
      <div className="profileInformationEditSettingsRow">
        <div className="profileInformationEditLeftContainer">
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            class="profilePictureContainer"
          ></div>
          <div className="buttonsContainer">
            <button className="editPictureSettings" onClick={triggerFileInput}>
              Edit Picture
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
        </div>
        <div className="profileInformationEditRightContainer">
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Idade:
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </label>
            <label>
              Gênero:
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Selecione...</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </label>
            <button className="editProfileSettings"type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSettings;
