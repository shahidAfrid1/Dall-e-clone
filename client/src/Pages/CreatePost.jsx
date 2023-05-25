import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets/index";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import axios from "axios";
import { server } from "../main";
import "../styles/createPosts.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    image: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.image) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${server}/post`,
          {
            ...form,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const response = await axios.post(
          `${server}/dalle`,
          {
            prompt: form.prompt,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setForm({
          ...form,
          image: `data:image/jpeg;base64,${response.data.image}`,
        });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please Enter a prompt");
    }
  };

  return (
    <section>
      <div className="post-hero">
        <h1>
          Create images by <span>Dall E</span> Artificial Intellegence modal and
          share it...
        </h1>

        <p>
          Unleash your imagination by writing various parameters and inputs in
          the prompt, choosing specific styles, themes, etc.
        </p>
      </div>

      <form onSubmit={handleSumbit}>
        <div className="form-create-img">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="joe rogan"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a painting of a fox in the style of Starry Night"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="preview">
            {form.image ? (
              <img src={form.image} alt={form.prompt} className="preview-img" />
            ) : (
              <img src={preview} alt="preview" className="preview-img-icon" />
            )}

            {generatingImg && (
              <div className="preview-loader">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="generate-btn"
            onClick={generateImage}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>

          <p>
            If you want to <span>download</span> the image then share it with
            your name
          </p>

          <button type="submit" className="submit-btn">
            {isLoading ? "Sharing..." : "Share & Download"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
