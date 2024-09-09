"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RootState, useAppDispatch } from "@/app/redux/store";
import { getposts } from "@/app/redux/feature/PostSlice/PostSlice";
import { useSelector } from "react-redux";
import Loading from "./loading";
import { Heart, MessageSquareText } from "lucide-react";
import Link from "next/link";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isloading, allPosts } = useSelector((state: RootState) => state.post);
  const [expanded, setExpanded] = useState(false);
  const [expandedid, setExpandedId] = useState("");
  const handleExpandClick = (id: string) => {
    setExpanded(!expanded);
    setExpandedId(id);
  };
  useEffect(() => {
    dispatch(getposts());
  }, [dispatch]);

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
            <h1 className="text-3xl font-bold my-4 ">All Posts</h1>
            {allPosts.length > 0
              ? allPosts.map((el, idx) => (
                  <div key={idx}>
                    <div className="md:w-[34rem] border border-gray-200 rounded-lg flex flex-col shadow-md bg-white ">
                      <div className="flex items-center p-4">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                          <Image
                            src={el.user.photo}
                            alt={el.user.name}
                            width={345}
                            height={194}
                            className="w-full h-full object-cover"
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
                      </div>
                      {el.image ? (
                        <div>
                          <Image
                            src={el.image}
                            alt={el.body}
                            width={400}
                            height={300}
                            style={{ width: "100%", height: "auto" }}
                            className=" object-cover"
                            priority
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
                          onClick={() => handleExpandClick(el._id)}
                          className={`  `}
                        >
                          <MessageSquareText />
                        </button>
                      </div>
                      {expanded &&
                        expandedid == el._id &&
                        el.comments.length > 0 && (
                          <div className=" border-t border-gray-400 bg-gray-200">
                            <div className="flex  p-4 flex-col space-y-3">
                              <div className=" flex-grow ">
                                <h2 className="text-lg font-semibold">
                                  <span className="text-blue-500">
                                    {" "}
                                    CommentCreator By
                                  </span>
                                  : {el.comments[0].commentCreator.name}
                                </h2>
                                <p className="">
                                  <span className="text-blue-500">In :</span>{" "}
                                  {el.comments[0].createdAt
                                    .split("")
                                    .slice(0, 10)
                                    .join("")}
                                </p>
                              </div>
                              <p className="font-semibold">
                                <span className="text-blue-500">Comment:</span>{" "}
                                {el.comments[0].content}
                              </p>
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

export default Home;
