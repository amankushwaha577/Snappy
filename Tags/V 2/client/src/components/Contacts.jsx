import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #000000;
  padding: 1rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 4rem;
      animation: fadeIn 1s ease;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    overflow: auto;
    padding: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    .contact {
      background-color: #bc0707;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #ff3333;
        transform: scale(1.02);
      }
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
      }
      .username {
        h3 {
          color: white;
          transition: color 0.3s ease;
        }
      }
    }
    .selected {
      background-color: #07bc0c;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
        transition: transform 0.3s ease;
      }
    }
    .username {
      h2 {
        color: white;
        transition: color 0.3s ease;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

