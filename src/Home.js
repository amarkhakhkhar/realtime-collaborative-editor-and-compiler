import React, { useState, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Home = () => {

    const captchaRef = useRef(null);

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = async () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // if (roomId && username) {
        //     let token = captchaRef.current.getValue();
        //     if (token) {
        //         let valid_token = await verifyToken(token);
        //         if (valid_token.success) {
        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });

        //     } else {
        //         toast.error(valid_token);
        //     }
        // } else {
        //     toast.error('You must confirm you are not a robot');
        // }


    };


    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="homePageWrapper">
                <div className="formWrapper">
                    {/* <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                /> */}
                <h1>Welcome ! </h1>
                <h2>Real time collaborative online code compiler and editor supporting 46 languages</h2>
                    <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                    <div className="inputGroup">
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="ROOM ID"
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                            onKeyUp={handleInputEnter}
                        />
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="USERNAME"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            onKeyUp={handleInputEnter}
                        />
                       
                        <button className="btn joinBtn" onClick={joinRoom}>
                            Join
                        </button>

                        <span className="createInfo">
                            If you don't have an invite then create &nbsp;
                            <a
                                onClick={createNewRoom}
                                href=""
                                className="createNewBtn"
                            >
                                new room
                            </a>
                        </span>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Home;
