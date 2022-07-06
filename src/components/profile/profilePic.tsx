import React from "react";
import { Icon } from "@iconify/react";
import { storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "../../Pages/ProfilePage.css";
import "./ProfileInfo.css";

import { useSelector, useDispatch } from "react-redux";
import { changeProfilePic } from "../../Redux/reducers/userById";
import { editUserProfile } from "../../services/profile";

type Props = {
  isInEditMode: boolean;
};

export const ProfilePic = ({ isInEditMode }: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const otherUser = useSelector((state: any) => state.userById.value);
  const dispatch = useDispatch();

  const postUpdateUser = async (user: any) => {
    try {
      await editUserProfile(user);
    } catch (err) {
      console.error(err, "Error in updating user");
    }
  };

  const uploadFile = (profilePic: File) => {
    if (profilePic == null) return;

    //store image in firebase and display on FE
    const imageRef = ref(storage, `profilePics/${profilePic.name + v4()}`);
    uploadBytes(
      imageRef,
      profilePic as unknown as Blob | Uint8Array | ArrayBuffer
    ).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(changeProfilePic({ url }));
        //----------------------
        const editedImg = {
          uid: user.uid,
          profilePic: url,
        };
        postUpdateUser(editedImg);
      });
    });
  };

  const UploadImageBox = () => {
    return (
      <input
        className="upload-image"
        id="img-input"
        type="file"
        accept="image/*"
        name="image"
        onChange={(e?) => {
          let file = (e!.target as HTMLInputElement)!.files![0];
          uploadFile(file);
        }}
      ></input>
    );
  };

  const ProfilePic = () => {
    return (
      <img
        className="img-input"
        src={otherUser.profilePic}
        alt="profilePic"
        style={{ maxHeight: "188px", maxWidth: "171px" }}
      />
    );
  };

  const EditButton = () => {
    return (
      <Icon className="icon-upload" icon="clarity:edit-solid" color="white" />
    );
  };

  return (
    <div className="profile-image">
      <label className="label-upload" htmlFor="img-input">
        <ProfilePic />
        {isInEditMode ? (
          //false = in edit mode
          <></>
        ) : (
          <>
            <UploadImageBox />
            <EditButton />
          </>
        )}
      </label>
    </div>
  );
};
