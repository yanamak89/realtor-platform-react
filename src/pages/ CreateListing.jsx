import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.js";

async function uploadImage(file) {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User must be logged in");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Image must be less than 2MB");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "realtor_unsigned");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dgoyh5mzg/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const result = await response.json();
  return result.secure_url;
}

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: "",
    images: {},
  });

  const { images } = formData;

  async function onSubmit(e) {
    e.preventDefault();

    const imageUrls = await Promise.all(
      [...images].map((image) => uploadImage(image))
    );

    const formDataCopy = {
      ...formData,
      imageUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    await addDoc(collection(db, "listings"), formDataCopy);
  }

  function onMutate(e) {
    let value = e.target.value;

    if (e.target.files) {
      value = e.target.files;
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: value,
    }));
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={onMutate}
        placeholder="Listing name"
      />

      <input
        type="file"
        id="images"
        accept=".jpg,.png,.jpeg"
        multiple
        onChange={onMutate}
      />

      <button type="submit">Create Listing</button>
    </form>
  );
}