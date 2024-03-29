import React, { useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"; // Import the useSelector hook
import { resetUser } from "../features/user"

const Home = (props) => {
  const [audioFile, setAudioFile] = useState(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Access the isAuthenticated state from the Redux store
  const dispatch = useDispatch();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };
  const handleLogout = () => {
    // Dispatch the action to reset the user state
    dispatch(resetUser());
    // You can also redirect the user to the sign-in page if needed
    window.location.replace("/sign-in");
  };

  const handlePredict = async () => {
  const formData = new FormData();
  formData.append('file', audioFile);

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/predict/predict-emotion/', formData);

    alert(response.data)
  } catch (error) {
    console.error('Error making prediction:', error);
  }
};
  if(!isAuthenticated) window.location.replace("/sign-in");
  return (

    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Vocal Vibe</h1>

      {/* logout button */}
      <div
        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-white cursor-pointer transition-all duration-300"
        onClick={handleLogout}
      >
        Logout
      </div>


      {/* Upload Button */}
      <label className="relative overflow-hidden">
        <input
          type="file"
          className="hidden"
          onChange={handleUpload}
          accept="audio/*"
        />
        <div className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-white cursor-pointer transition-all duration-300">
          Upload Audio
        </div>
      </label>

      {/* Predict Button (Visible only after uploading) */}
      {audioFile && (
        <div
          className="bg-green-500 hover:bg-green-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
          onClick={handlePredict}
        >
          Predict
        </div>
      )}
      
    </div>
  );
};

export default Home;