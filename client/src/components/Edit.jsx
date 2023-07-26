import { AddAPhoto, Cancel, DownloadDone, ModeEdit } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"
import { userRequest } from "../requestMetohd";
import { UpdateUser } from "../redux/apiCalls";
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Trigger = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: white;
  color: black;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`;

const ModalHolder = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #4e4848;
  opacity: 0.9;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-sizing:border-box;
`;

const Modal = styled.div`
  width: 600px;
  height: 600px;
  background-color: #929292;
  border-radius:15px;
`;
const Form = styled.form`
`;

const PictureWrapper = styled.div`
  position: relative;
`

const ImageInput = styled.input`
  display: none;
`

const CoverPic = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
   
`

const ProfilePic = styled.img`
     width: 150px;
     height: 150px;
     border-radius: 50%;
     object-fit: cover;
     display: block;
     margin: auto;
     margin-top: 0;
`;

const MultipleInput = styled.div`
  display: flex;
  justify-content:${(props) => props.single ? "center" : "space-around"};
  margin-bottom: 5px;
  /* width: 100%; */
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid gray;
  outline: none;
`
const Label = styled.label`
  font-size: 13px;
  font-weight: 300;
`

const Buttons = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 20px;
margin-top: 10px;
`

const ActionButton = styled.button`
display: flex;
align-items: center;
padding: 5px ;
border-radius: 5px;
border: ${(props) => props.border ? "1px solid gray" : "none"};
background-color: ${props => props.bgcolor || "none"};
color: ${props => props.color || "black"};
font-size: 13px;
font-weight: 400;
cursor: pointer;
`

const Edit = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null)
  const [coverPicture, setCoverPicture] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const closeModal = () => {
    setOpen(false)
  }

  const openModal = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setUploading(true)

    if (profilePicture) {
      let data = new FormData();
      const fileName = new Date().getTime() + profilePicture.name
      data.append("name", fileName);
      data.append("file", profilePicture)

      try {
        const res = await userRequest.post("/upload", data)
        UpdateUser(dispatch, currentUser?._id, { profilePicture: res.data.file })
      } catch (error) {
        console.log(error)
        setUploading(false)
      }
    }

    if (coverPicture) {
      let data = new FormData();
      const fileName = new Date().getTime() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      try {
        const res = await userRequest.post('/upload', data);
        UpdateUser(dispatch, currentUser?._id, { coverPicture: res.data.file })
      } catch (error) {
        console.log(error)
        setUploading(false)
      }

    }
    UpdateUser(dispatch, currentUser?._id, updateData)
    setUploading(false)
    closeModal()
    window.location.reload()
  }

  return (
    <ModalContainer>
      <Trigger onClick={openModal}>
        Edit <ModeEdit style={{ height: "14px", color: "black" }} />
      </Trigger>
      {open && (
        <ModalHolder >
          <Modal>
            <Form onSubmit={ handleSubmit}>
              <PictureWrapper>
                {coverPicture ? <CoverPic src={URL.createObjectURL(coverPicture)} /> : <CoverPic src={currentUser?.coverPicture ? currentUser.coverPicture : "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-davys-grey-solid-color-background.jpg"} />}
                <Label htmlFor="coverPicture" >
                  <AddAPhoto style={{ position: "absolute", bottom: 10, right: 10, color: "white" }} />
                </Label>
                <ImageInput id="coverPicture" name="coverPicture" type="file" accept=".jpeg,.jpg,.png" onChange={(e) => setCoverPicture(e.target.files[0])} />
              </PictureWrapper>
              <PictureWrapper>
                {profilePicture ? <ProfilePic src={URL.createObjectURL(profilePicture)} /> : <ProfilePic src={currentUser?.profilePicture ? currentUser.profilePicture : "http://localhost:5000/static/profilePic.png"} />}
                <Label htmlFor="profilePicture" >
                  <AddAPhoto style={{ position: "absolute", bottom: 10, right: 10, color: "white" }} />
                </Label>
                <ImageInput id="profilePicture" name="profilePicture" type="file" accept=".jpeg,.jpg,.png" onChange={(e) => setProfilePicture(e.target.files[0])} />
              </PictureWrapper>
              <MultipleInput>
                <InputWrapper>
                  <Label>First Name</Label>
                  <Input type="text" name="firstName" defaultValue={currentUser.firstName} minLength={1} onChange={(e) => setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }))} required />
                </InputWrapper>
                <InputWrapper>
                  <Label>Last Name</Label>
                  <Input type="text" name="lastName" defaultValue={currentUser.lastName} minLength={1} onChange={(e) => setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }))} required/>
                </InputWrapper>
              </MultipleInput>

              <MultipleInput>
                <InputWrapper>
                  <Label>Current City</Label>
                  <Input type="text" name="currentCity" defaultValue={currentUser.currentCity} minLength={1} onChange={(e) => setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }))} required/>
                </InputWrapper>
                <InputWrapper>
                  <Label>Country</Label>
                  <Input type="text" name="country" defaultValue={currentUser.country} minLength={1} onChange={(e) => setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }))} required/>
                </InputWrapper>
              </MultipleInput>

              <MultipleInput single={"single"}>
                <InputWrapper>
                  <Label>Profession</Label>
                  <Input type="text" name="profession" defaultValue={currentUser.profession} minLength={1} onChange={(e) => setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }))} required/>
                </InputWrapper>
              </MultipleInput>
              <Buttons>
                <ActionButton bgcolor="grey" color="white" onClick={closeModal}>Cancel<Cancel style={{ height: "14px", color: "white" }} /></ActionButton>
                <ActionButton type="submit"> {uploading ? "Updating" : "Update"}<DownloadDone style={{ height: "14px", color: "black" }} /></ActionButton>
              </Buttons>
            </Form>
          </Modal>
        </ModalHolder>
      )}
    </ModalContainer>
  );
};

export default Edit;
