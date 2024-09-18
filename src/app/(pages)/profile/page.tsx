"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { RootState, useAppDispatch } from "@/app/redux/store";
import {
  addComment,
  addPost,
  deletePost,
  getAllposts,
  getDataUser,
  uploadImage,
} from "@/app/redux/feature/PostSlice/PostSlice";
import { useSelector } from "react-redux";
import Loading from "./loading";
import { Heart, MessageSquareText, MoveUp, OctagonX } from "lucide-react";
import Button from "@/app/_components/UI/Button";
import Model from "@/app/_components/UI/Model";
import Link from "next/link";
import image from "../../assets/Images/logo.png";
const Profile = () => {
  const [openPost, setOpen] = useState(false);
  const [openLoadimage, setLoad] = useState(false);
  const dispatch = useAppDispatch();
  const { isloading, allPost, addLoad, userData } = useSelector(
    (state: RootState) => state.post
  );
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState<string>("");
  const [inputValue, setInputValue] = useState<any>(null);
  const [inputImage, setinputImage] = useState<any>(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    dispatch(getAllposts());
    dispatch(getDataUser());
  }, [dispatch]);

  function handleOpen() {
    setOpen(!openPost);
  }
  function handleOpen2() {
    setLoad(!openLoadimage);
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setInputValue(file);
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setinputImage(file);
  };
  async function handlePost2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(inputImage);
    let postImage = new FormData();
    if (inputImage) {
      postImage.append("photo", inputImage);
    }
    await dispatch(uploadImage(postImage));
    setLoad((item) => item == false);
    dispatch(getDataUser());
    dispatch(getAllposts());
  }
  async function handlePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setText("");
    console.log(text, inputValue);
    let postForm = new FormData();
    postForm.append("body", text);
    if (inputValue) {
      postForm.append("image", inputValue);
    }
    await dispatch(addPost(postForm));
    setOpen((item) => item == false);
    dispatch(getAllposts());
  }

  async function deleteMyPost(id: string) {
    await dispatch(deletePost(id));
    dispatch(getAllposts());
  }
  const [comment, setComment] = useState("");
  async function handleAddComment(e: FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    console.log(comment, id);
    await dispatch(addComment({ content: comment, post: id }));
    setComment("");
    dispatch(getAllposts());
  }
  return (
    <>
      {isloading ? (
        <div className="md:pt-28">
          {Array.from({ length: 4 }, (_, idx) => (
            <Loading key={idx} />
          ))}
        </div>
      ) : (
        <div className="bg-[#F9F9F9]">
          <div className="container pt-4 md:pt-28 flex flex-col gap-4   items-center">
            <h1 className="text-3xl font-bold my-4 ">My Posts</h1>

            <Button
              className=" fixed right-8  bg-blue-600 p-3 rounded-md w-fit text-white"
              onClick={() => handleOpen()}
            >
              Add Post
            </Button>

            {openPost && (
              <Model openForm={openPost} handleOpen={handleOpen}>
                <form onSubmit={(e) => handlePost(e)}>
                  <textarea
                    value={text}
                    onChange={(e) => handleTextAreaChange(e)}
                    id="textarea"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write your thoughts here..."
                  />

                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="fileinput"
                    >
                      Upload multiple files
                    </label>
                    <input
                      className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 
                      "
                      onChange={handleInputChange}
                      id="fileinput"
                      type="file"
                      multiple
                    />
                  </div>

                  <div className="flex gap-4 my-4">
                    <Button
                      onClick={() => handleOpen()}
                      className="px-4 py-2 text-white rounded-md bg-red-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="px-4 py-2 text-white rounded-md bg-blue-500 disabled:bg-blue-300 flex justify-center"
                      isloading={addLoad}
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </Model>
            )}
            {openLoadimage && (
              <Model openForm={openLoadimage} handleOpen={handleOpen2}>
                <form onSubmit={(e) => handlePost2(e)}>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="fileinput"
                    >
                      Upload multiple files
                    </label>
                    <input
                      className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 
                      "
                      onChange={handleImage}
                      id="fileinput"
                      type="file"
                      multiple
                    />
                  </div>

                  <div className="flex gap-4 my-4">
                    <Button
                      onClick={() => handleOpen2()}
                      className="px-4 py-2 text-white rounded-md bg-red-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="px-4 py-2 text-white rounded-md bg-blue-500 disabled:bg-blue-300 flex justify-center"
                      isloading={addLoad}
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </Model>
            )}
            <div className="md:w-[34rem] border border-gray-200 rounded-lg  p-4 shadow-md bg-white ">
              <h2 className="text-2xl font-bold">About User</h2>
              <div className="flex justify-between  py-2 items-center">
                <div className="text-lg">
                  <p>UserName: {userData.name}</p>
                  <p>DateOfBirth: {userData.dateOfBirth}</p>
                  <p>Email: {userData.email} </p>
                </div>
                <div className=" rounded-full flex flex-col   items-center text-white font-bold">
                  <Image
                    src={userData.photo}
                    alt={userData.name}
                    width={200}
                    height={200}
                    style={{ width: "50%", height: "50%" }}
                    priority
                  />
                  <button
                    className="p-4 my-4 flex items-center bg-black rounded-full "
                    onClick={() => handleOpen2()}
                  >
                    <MoveUp />
                    Upload New Image
                  </button>
                </div>
              </div>
            </div>
            {allPost.length > 0
              ? allPost.map((el, idx) => (
                  <div key={idx}>
                    <div className="md:w-[34rem] border border-gray-200 rounded-lg flex flex-col shadow-md bg-white ">
                      <div className="flex items-center p-4">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                          <Image
                            src={el.user.photo}
                            alt={el.user.name}
                            width={400}
                            height={300}
                            style={{ width: "100%", height: "auto" }}
                            priority
                          />
                        </div>
                        <div className="ml-4 flex-grow ">
                          <h2 className="text-lg font-semibold">
                            {el.user.name}
                          </h2>
                          <p className="text-gray-500">
                            {el.createdAt.split("").slice(0, 10).join("")}
                          </p>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteMyPost(el._id)}
                        >
                          <OctagonX className="text-red-600" />
                        </div>
                      </div>
                      {el.image ? (
                        <div>
                          <Image
                            src={el.image}
                            alt={el.body}
                            width={345}
                            height={194}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : null}

                      <div className="p-4">
                        <p className="text-gray-700">{el.body}</p>
                      </div>
                      <div className="flex items-center justify-between p-4 border-t border-gray-200">
                        <button aria-label="add to favorites">
                          <Heart />
                        </button>
                        <Link
                          href={`/singlepost/${el._id}`}
                          className="text-center rounded-md font-bold bg-blue-500 p-4 text-white"
                        >
                          View All Comments
                        </Link>
                        <button
                          aria-expanded={expanded}
                          aria-label="show more"
                          onClick={handleExpandClick}
                          className={`  `}
                        >
                          <MessageSquareText />
                        </button>
                      </div>
                      <form onSubmit={(e) => handleAddComment(e, el._id)}>
                        <div className="mb-6 p-4 flex justify-between ">
                          <input
                            type="text"
                            id="large-input"
                            className="block flex-grow p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Add Comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button className="bg-blue-500   px-2 text-white rounded-md text-sm">
                            Add Comment
                          </button>
                        </div>
                      </form>
                      {expanded && el.comments.length > 0 && (
                        <div className=" border-t border-gray-400 bg-gray-200">
                          <div className="flex  p-4 flex-col space-y-3">
                            <div className=" flex-grow ">
                              <h2 className="text-lg font-semibold">
                                {el.comments[0].commentCreator.name}
                              </h2>
                              <p className="text-gray-500">
                                {el.comments[0].createdAt
                                  .split("")
                                  .slice(0, 10)
                                  .join("")}
                              </p>
                            </div>
                            <p>{el.comments[0].content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : "No post Yet"}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
