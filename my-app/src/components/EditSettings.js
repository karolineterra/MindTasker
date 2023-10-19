import React, { useState } from "react";
import userImage from "../assets/userImage.png"

import '../styles/Settings.css';

function EditSettings() {
    const [image, setImage] = useState(userImage);
    const fileInputRef = React.createRef();

    const handleImageUpload = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="profileInformation">
            <h1>Profile</h1>
            <div className="informationPanel">

                <div style={{ 
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'}} class="profilePictureContainer"></div>
            </div>
            <div className="buttonsContainer">
                <button className="editPictureSettings" onClick={triggerFileInput}>Edit Picture</button>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} ref={fileInputRef} />
                <a className="editProfileSettings" href="/settings">Edit Profile</a>
            </div>
        </div>
    );
}

export default EditSettings;

