"use client";
import { addComment, getSingle } from "@/app/redux/feature/PostSlice/PostSlice";
import { RootState, useAppDispatch } from "@/app/redux/store";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../home/loading";
import Image from "next/image";
import { Heart, MessageSquareText } from "lucide-react";
interface IPrpos {
  params: {
    id: string;
  };
}
function Singlepost({ params }: IPrpos) {
  const id = params.id;
  const path = usePathname();
  /*   console.log(path.split("/")[2]);
   */
  const { singlePost, isloading } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSingle(id));
  }, []);

  const [expanded, setExpanded] = useState(true);
  const [comment, setComment] = useState("");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  async function handleAddComment(e: FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    console.log(comment, id);
    await dispatch(addComment({ content: comment, post: id }));
    setComment("");
    dispatch(getSingle(id));
  }
  return (
    <>
      {isloading ? (
        <div className="md:pt-28">
          {Array.from({ length: 1 }, (_, idx) => (
            <Loading key={idx} />
          ))}
        </div>
      ) : (
        singlePost && (
          <div className="bg-[#F9F9F9]">
            <div className="container pt-4 md:pt-28 flex flex-col gap-4   items-center">
              <h1 className="text-3xl font-bold my-4 ">
                {" "}
                All Comments Of This Post
              </h1>

              <div key={singlePost?._id}>
                <div className="md:w-[34rem] border border-gray-200 rounded-lg flex flex-col shadow-md bg-white ">
                  <div className="flex items-center p-4">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      <Image
                        src={singlePost?.user.photo}
                        alt={singlePost?.user.name}
                        width={345}
                        height={194}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow ">
                      <h2 className="text-lg font-semibold">
                        {singlePost.user.name}
                      </h2>
                      <p className="text-gray-500">
                        {singlePost.createdAt.split("").slice(0, 10).join("")}
                      </p>
                    </div>
                  </div>
                  {singlePost?.image ? (
                    <div>
                      <Image
                        src={singlePost.image}
                        alt={singlePost.body}
                        width={400}
                        height={300}
                        style={{ width: "100%", height: "auto" }}
                        className=" object-cover"
                        priority
                      />
                    </div>
                  ) : null}

                  <div className="p-4">
                    <p className="text-gray-700">{singlePost.body}</p>
                  </div>
                  <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <button aria-label="add to favorites">
                      <Heart />
                    </button>

                    <button
                      aria-expanded={expanded}
                      aria-label="show more"
                      onClick={() => handleExpandClick()}
                      className={`  `}
                    >
                      <MessageSquareText />
                    </button>
                  </div>
                  <form onSubmit={(e) => handleAddComment(e, singlePost._id)}>
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
                  {expanded && singlePost?.comments.length > 0 && (
                    <div className=" border-t border-gray-400 ">
                      {singlePost.comments
                        .slice()
                        .reverse()
                        .map((el, idx) => (
                          <div
                            className="flex  p-4 flex-col space-y-3 bg-gray-200 my-3"
                            key={idx}
                          >
                            <div className=" flex-grow ">
                              <h2 className="text-lg font-semibold">
                                <span className="text-blue-500">
                                  {" "}
                                  CommentCreator By
                                </span>
                                : {el.commentCreator.name}
                              </h2>
                              <p className="">
                                <span className="text-blue-500">In :</span>{" "}
                                {el.createdAt.split("").slice(0, 10).join("")}
                              </p>
                            </div>
                            <p className="font-semibold">
                              <span className="text-blue-500">Comment:</span>{" "}
                              {el.content}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Singlepost;
