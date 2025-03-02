
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SocialNetwork, Post } from "@/types/social";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
}

export const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [network, setNetwork] = useState<SocialNetwork>("generic");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handlePost = () => {
    if (!content) {
      toast({
        title: "Error",
        description: "Content cannot be empty.",
      });
      return;
    }

    // Mock post creation
    const newPost: Post = {
      id: String(Date.now()),
      network: network,
      content: content,
      date: new Date().toLocaleDateString(),
      engagement: 0,
      personaId: "mockPersonaId",
    };

    onPostCreated(newPost);
    setContent("");

    toast({
      title: "Success",
      description: "Post created successfully!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>Share your thoughts with the world.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="network">Social Network</Label>
          <Select onValueChange={value => setNetwork(value as SocialNetwork)}>
            <SelectTrigger id="network">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
              <SelectItem value="generic">Generic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Type your message here."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <Button onClick={handlePost}>Post</Button>
      </CardContent>
    </Card>
  );
};
