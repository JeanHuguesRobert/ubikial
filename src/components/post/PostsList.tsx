
import { Post } from "@/types/social";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PostsListProps {
  posts: Post[];
}

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-900">Recent Posts</h2>
      <div className="mt-4 space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.network}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              <p className="mt-2 text-sm text-gray-500">Engagement: {post.engagement}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
