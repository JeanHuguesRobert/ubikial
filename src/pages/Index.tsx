
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Credential, Post, SocialNetwork } from "@/types/social";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

const Index = () => {
  const { isSignedIn, user } = useUser();
  const [network, setNetwork] = useState<SocialNetwork>("generic");
  const [content, setContent] = useState("");
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for demonstration
    const mockCredentials: Credential[] = [
      {
        id: "1",
        network: "twitter",
        username: "@testuser",
        profileUrl: "https://twitter.com/testuser",
        apiKey: "testapikey",
        personaIds: [],
      },
      {
        id: "2",
        network: "linkedin",
        username: "testuser",
        profileUrl: "https://linkedin.com/in/testuser",
        apiKey: "testapikey",
        personaIds: [],
      },
    ];
    setCredentials(mockCredentials);

    const mockPosts: Post[] = [
      {
        id: "101",
        network: "twitter",
        content: "Check out my new blog post!",
        date: new Date().toLocaleDateString(),
        engagement: 150,
        personaId: "1",
      },
      {
        id: "102",
        network: "linkedin",
        content: "Excited to share my insights on...",
        date: new Date().toLocaleDateString(),
        engagement: 210,
        personaId: "2",
      },
    ];
    setPosts(mockPosts);
  }, []);

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

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setContent("");

    toast({
      title: "Success",
      description: "Post created successfully!",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {isSignedIn ? (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName || 'User'}</h1>
                <p className="text-gray-600 mt-1">Manage your social media presence</p>
              </div>
              <Button variant="default">
                <Globe className="mr-2 h-4 w-4" />
                New Persona
              </Button>
            </div>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
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
              </TabsContent>
              <TabsContent value="credentials">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Credentials</CardTitle>
                    <CardDescription>Manage your social media accounts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {credentials.map(credential => (
                      <div key={credential.id} className="border rounded-md p-4">
                        <h3 className="text-lg font-semibold">{credential.network}</h3>
                        <p>Username: {credential.username}</p>
                        <p>Profile URL: {credential.profileUrl}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center space-y-6 py-12">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to EchoSphere</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage multiple social media personas and cross-post content with AI-assisted improvements.
              Sign in to get started.
            </p>
            <div className="flex justify-center gap-4">
              <SignInButton mode="redirect">
                <Button variant="default" size="lg">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </SignUpButton>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
