import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type IPost = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const delay = async () => new Promise((resolve) => setTimeout(resolve, 1000));

const fetchPost = async (): Promise<IPost[]> => {
  await delay();
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return await res.data;
};

const Posts = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log("posts", data);

  if (isLoading) {
    return <h1>Posts Loading...</h1>;
  }
  if (isFetching) {
    return <h1>Fetching Datas...</h1>;
  }
  if (isError) {
    return (
      <>
        <h1>Error found</h1>
        <h3>{error?.message}</h3>
      </>
    );
  }
  return (
    <>
      <h1>Posts Display</h1>
      {data?.map((post, i) => (
        <div key={i}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </>
  );
};

export default Posts;
